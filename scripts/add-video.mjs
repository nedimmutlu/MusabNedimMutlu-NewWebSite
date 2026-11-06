#!/usr/bin/env node
/**
 * Add a local video to the portfolio.
 *
 * Usage:
 *   npm run add:video -- "D:\path\clip.mp4"
 *   npm run add:video -- "D:\path\clip.mp4" --title "Marka Filmi" --client "ACME" --category commercial
 *
 * What it does:
 *   1. probes the source with ffprobe (duration + orientation),
 *   2. compresses it to a web-friendly MP4 in public/media/videos,
 *   3. extracts a poster in public/media/posters,
 *   4. appends a draft entry to src/content/videos.json.
 *
 * New entries are published:false by default. Review the copy in Pages CMS
 * (or videos.json), then switch "Yayında" on.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const videosPath = join(root, 'src', 'content', 'videos.json');
const videosDir = join(root, 'public', 'media', 'videos');
const postersDir = join(root, 'public', 'media', 'posters');

const CATEGORY_LABELS = {
  film: { tr: 'Film', en: 'Film' },
  commercial: { tr: 'Reklam Filmi', en: 'Commercial' },
  documentary: { tr: 'Belgesel', en: 'Documentary' },
};

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    stdio: options.capture ? 'pipe' : 'inherit',
    ...options,
  });
  if (result.error) fail(`${command} çalıştırılamadı: ${result.error.message}`);
  if (result.status !== 0) {
    fail(`${command} hata verdi (kod ${result.status}).${options.capture ? `\n${result.stderr}` : ''}`);
  }
  return result.stdout?.trim() ?? '';
}

function probe(file, entries) {
  return run('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', entries,
    '-of', 'default=noprint_wrappers=1:nokey=1',
    file,
  ], { capture: true });
}

function slugify(value) {
  const map = { ç: 'c', ğ: 'g', ı: 'i', İ: 'i', ö: 'o', ş: 's', ü: 'u', Ç: 'c', Ğ: 'g', Ö: 'o', Ş: 's', Ü: 'u' };
  return value
    .replace(/[çğıİöşüÇĞÖŞÜ]/g, (char) => map[char] ?? char)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function formatDuration(seconds) {
  const total = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
}

async function ask(question, fallback = '') {
  if (!input.isTTY) return fallback;
  const rl = createInterface({ input, output });
  try {
    const answer = (await rl.question(question)).trim();
    return answer || fallback;
  } finally {
    rl.close();
  }
}

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    title: { type: 'string' },
    'title-en': { type: 'string' },
    client: { type: 'string' },
    category: { type: 'string' },
    description: { type: 'string' },
    'description-en': { type: 'string' },
    id: { type: 'string' },
    year: { type: 'string' },
    tools: { type: 'string' },
    publish: { type: 'boolean', default: false },
    force: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
});

if (values.help || positionals.length === 0) {
  console.log(`
Kullanım:
  npm run add:video -- "D:\\video.mp4" [seçenekler]

Seçenekler:
  --title "Başlık"          Türkçe başlık (boşsa sorulur)
  --title-en "Title"        İngilizce başlık (boşsa Türkçe başlık kullanılır)
  --client "Marka"          Müşteri adı (opsiyonel)
  --category commercial     film | commercial | documentary (varsayılan: commercial)
  --description "Metin"     Türkçe açıklama
  --description-en "Text"   İngilizce açıklama
  --id marka-filmi          Dosya adı / kimlik (boşsa başlıktan üretilir)
  --year 2026               Yıl (varsayılan: bu yıl)
  --tools "AI video,CapCut" Araç listesi
  --publish                 Yayında olarak ekle (varsayılan: taslak)
  --force                   Aynı kimlik varsa üzerine yaz
`);
  process.exit(0);
}

const source = resolve(process.cwd(), positionals[0]);
if (!existsSync(source)) fail(`Video bulunamadı: ${source}`);
if (extname(source).toLowerCase() !== '.mp4') {
  console.warn('⚠ Kaynak MP4 değil. ffmpeg yine de dönüştürmeyi deneyecek.');
}

run('ffmpeg', ['-version'], { capture: true });

const durationRaw = Number(run('ffprobe', [
  '-v', 'error',
  '-show_entries', 'format=duration',
  '-of', 'default=noprint_wrappers=1:nokey=1',
  source,
], { capture: true }));

const dimensions = probe(source, 'stream=width,height').split('\n').map(Number);
const width = dimensions[0];
const height = dimensions[1];
if (!Number.isFinite(durationRaw) || !width || !height) {
  fail('Video bilgileri okunamadı. Dosya bozuk olabilir.');
}

const orientation = height > width ? 'portrait' : 'landscape';
let title = values.title;
if (!title) title = await ask('Türkçe başlık: ');
if (!title) fail('Başlık gerekli.');

let titleEn = values['title-en'] || title;
let client = values.client;
if (client === undefined) client = await ask('Müşteri (opsiyonel, boş bırakılabilir): ');

let category = values.category;
if (!category) {
  category = await ask('Kategori [film/commercial/documentary] (varsayılan commercial): ', 'commercial');
}
if (!CATEGORY_LABELS[category]) fail(`Geçersiz kategori: ${category}`);

const slug = values.id || slugify(titleEn !== title ? titleEn : title) || slugify(source);
if (!/^[a-z0-9-]+$/.test(slug)) fail(`Geçersiz kimlik: ${slug}`);

const videos = JSON.parse(readFileSync(videosPath, 'utf8'));
if (videos.some((video) => video.id === slug)) {
  if (!values.force) fail(`"${slug}" zaten var. Farklı bir --id verin ya da --force kullanın.`);
  console.warn(`⚠ "${slug}" mevcut kaydın üzerine yazılacak (--force).`);
}

const videoFile = join(videosDir, `${slug}.mp4`);
const posterFile = join(postersDir, `${slug}.jpg`);
mkdirSync(videosDir, { recursive: true });
mkdirSync(postersDir, { recursive: true });

const scale = orientation === 'portrait'
  ? "scale=w=-2:h='min(1280,ih)'"
  : "scale=w='min(1920,iw)':h=-2";

console.log(`\n→ Sıkıştırılıyor: ${width}×${height}, ${formatDuration(durationRaw)} (${orientation})`);
run('ffmpeg', [
  '-y', '-v', 'error',
  '-i', source,
  '-map', '0:v:0',
  '-map', '0:a?',
  '-vf', scale,
  '-c:v', 'libx264',
  '-preset', 'slow',
  '-crf', '23',
  '-pix_fmt', 'yuv420p',
  '-c:a', 'aac',
  '-b:a', '128k',
  '-ac', '2',
  '-movflags', '+faststart',
  videoFile,
]);

const posterSeek = Math.min(3, Math.max(0.5, durationRaw * 0.25));
console.log('→ Kapak görseli alınıyor');
run('ffmpeg', [
  '-y', '-v', 'error',
  '-ss', posterSeek.toFixed(2),
  '-i', videoFile,
  '-frames:v', '1',
  '-vf', orientation === 'portrait' ? 'scale=-2:1600' : 'scale=1600:-2',
  '-q:v', '2',
  posterFile,
]);

const year = values.year || String(new Date().getFullYear());
const descriptionTr = values.description || `${title} — yapay zekâ ile üretilmiş bir video çalışması.`;
const descriptionEn = values['description-en'] || `${titleEn} — a video work made with AI.`;
const tools = (values.tools || 'AI video,CapCut,Colour').split(',').map((tool) => tool.trim()).filter(Boolean);

const entry = {
  id: slug,
  kind: 'work',
  title: { tr: title, en: titleEn },
  ...(client ? { client: { tr: client, en: client } } : {}),
  description: { tr: descriptionTr, en: descriptionEn },
  src: `/media/videos/${slug}.mp4`,
  poster: `/media/posters/${slug}.jpg`,
  duration: formatDuration(durationRaw),
  year,
  category,
  categoryLabel: CATEGORY_LABELS[category],
  orientation,
  tools,
  credits: {
    tr: 'Fikir, prompt & kurgu — Musab Nedim Mutlu',
    en: 'Idea, prompt & edit — Musab Nedim Mutlu',
  },
  featured: false,
  published: Boolean(values.publish),
};

const existingIndex = videos.findIndex((video) => video.id === slug);
if (existingIndex >= 0) videos[existingIndex] = entry;
else videos.push(entry);

writeFileSync(videosPath, `${JSON.stringify(videos, null, 2)}\n`, 'utf8');

console.log(`
✔ Eklendi: ${entry.title.tr} (${entry.duration}, ${orientation})
  video  → public/media/videos/${slug}.mp4
  poster → public/media/posters/${slug}.jpg
  kayıt  → src/content/videos.json${entry.published ? '' : '\n\n  Durum: TASLAK (published:false). Başlık/açıklamayı düzenleyip yayına alın.'}
`);
