import experienceData from './experience.json';
import metricsData from './metrics.json';
import profileData from './profile.json';
import projectsData from './projects.json';
import skillsData from './skills.json';
import type { Experience, LocalizedText, Metric, Profile, Project, SkillCategory } from './types';

export type {
  Experience,
  Locale,
  LocalizedText,
  Metric,
  Profile,
  Project,
  SkillCategory,
} from './types';

export const profile = profileData as Profile;
export const experience = experienceData as Experience[];
export const metrics = metricsData as Metric[];
export const projects = projectsData as Project[];
export const skillCategories = skillsData as SkillCategory[];

export const marquee: LocalizedText[] = [
  { tr: 'AI FİLM', en: 'AI FILM' },
  { tr: 'REKLAM', en: 'COMMERCIAL' },
  { tr: 'PROMPT TASARIMI', en: 'PROMPT DESIGN' },
  { tr: 'KURGU & SES', en: 'EDIT & SOUND' },
  { tr: 'IT OPERASYON', en: 'IT OPERATIONS' },
  { tr: 'SERVİS MASASI', en: 'SERVICE DESK' },
  { tr: 'IAM', en: 'IAM' },
  { tr: 'KÖK NEDEN ANALİZİ', en: 'ROOT CAUSE ANALYSIS' },
];

export const copy = {
  tr: {
    meta: {
      title: 'Musab Nedim Mutlu — AI Filmmaker & IT Operasyon Uzmanı',
      description:
        'Yapay zekâ ile sinematik filmler ve reklamlar üreten, yüksek tempolu IT operasyonlarında çalışan Musab Nedim Mutlu’nun portföyü.',
    },
    nav: {
      work: 'İşler',
      projects: 'Projeler',
      skills: 'Beceriler',
      experience: 'Deneyim',
      about: 'Hakkımda',
      contact: 'İletişim',
      cv: 'CV',
      menu: 'Menü',
      close: 'Kapat',
    },
    hero: {
      eyebrow: 'AI Filmmaker & IT Operasyon Uzmanı',
      titleLines: [
        [{ text: 'Fikri görüntüye,' }],
        [{ text: 'görüntüyü ' }, { text: 'etkiye', em: true }],
        [{ text: 'çeviriyorum.' }],
      ],
      body:
        'Yapay zekâ ile sinematik filmler ve reklamlar üretiyorum; yüksek tempolu IT operasyonlarında sistemleri, süreçleri ve insanları ayakta tutuyorum.',
      primary: "Showreel'i izle",
      secondary: 'İşleri gör',
      status: 'Yeni projelere açık',
      location: 'Türkiye',
      timezone: 'UTC+3',
      reelLabel: 'SHOWREEL 2026',
      reelMeta: '05 video · 00:26',
      scroll: 'Kaydır',
      metrics: [
        { value: '3+', label: 'yıl IT deneyimi' },
        { value: '95%+', label: 'SLA uyumu' },
        { value: '1.000+', label: 'desteklenen kullanıcı' },
      ],
    },
    work: {
      kicker: '01 — Video Çalışmaları',
      title: 'Video Çalışmaları.',
      body:
        'Yapay zekâ ile ürettiğim filmler ve reklamlar. Her biri bir fikirle başladı; ışık, hareket ve kurguyla tamamlandı.',
      count: 'video',
      open: 'İncele',
      clientLabel: 'Müşteri',
      gallery: 'Video Çalışmaları',
      nextKicker: 'Sıradaki',
      nextTitle: 'Sıradaki film, senin fikrinle başlasın.',
      nextBody: 'Bir marka filmi, deneysel bir kısa ya da aklında kalan tek bir kare — konuşalım.',
      nextCta: 'Bir proje konuşalım',
      empty: 'Henüz yayında video yok.',
    },
    projects: {
      kicker: '02 — Projeler',
      title: 'Kod, sistem ve otomasyon.',
      body:
        'IT operasyonlarında işi kolaylaştıran araçlar ve AI destekli geliştirme pratiği. Hepsi gerçek bir ihtiyaçtan doğdu.',
      viewRepo: 'Repoyu gör',
      completed: 'Tamamlandı',
      inProgress: 'Devam ediyor',
    },
    skills: {
      kicker: '03 — Beceriler',
      title: 'İki dünya, tek yaklaşım.',
      body:
        'Bir yanda ışık, hareket ve anlatı; diğer yanda loglar, yetkilendirmeler ve SLA’lar. İkisinde de aynı şeyi arıyorum: işi kolaylaştıran net bir çözüm.',
      hint: 'Bir alan seç, detayı gör.',
      toolsLabel: 'Sık kullanılan araçlar',
    },
    experience: {
      kicker: '04 — Deneyim',
      title: 'Sahada geçen üç yıl.',
      body:
        'Yüksek hacimli servis masaları, IAM yönetimi ve SLA kritik operasyonlar. Sayılar kadar, o sayıların arkasındaki insanlar da önemli.',
      remote: 'Uzaktan',
      present: 'Günümüz',
      educationTitle: 'Eğitim & Diller',
      education: 'Açık Öğretim Lisesi',
      educationMeta: 'MEB · Mezun',
      languages: [
        { name: 'Türkçe', level: 'Ana dil' },
        { name: 'İngilizce', level: 'C1 · Profesyonel' },
      ],
    },
    about: {
      kicker: '05 — Hakkımda',
      title: 'Kamera arkasında da, sistem arkasında da.',
      paragraphs: [
        'Musab. Türkiye’de yaşıyorum; iki farklı dünyanın kesişiminde çalışıyorum. Bir yanda yapay zekâ ile görüntü üretmek, ışıkla ve hareketle hikâye anlatmak var. Diğer yanda yüksek tempolu IT operasyonlarında sistemleri, yetkileri ve insanları ayakta tutmak.',
        'Bu iki alan bana uzak görünmüyor. İkisinde de iyi iş, doğru soruyu sormakla başlıyor: Neyi çözmeye çalışıyorsun? Hangi detay fark yaratıyor? Sonuç, kullanıcıya nasıl hissettiriyor? AI filmlerinde cevabı kurguda, IT’de loglarda ve süreçlerde arıyorum.',
        'Yeni projelere, iş birliklerine ve uzaktan fırsatlara açığım.',
      ],
      quote: 'İyi bir görüntü gibi, iyi bir sistem de kendini hissettirmeden çalışır.',
      caption: 'Musab Nedim Mutlu · Türkiye',
      stats: [
        { value: '3+', label: 'yıl IT operasyon' },
        { value: '1.000+', label: 'desteklenen kullanıcı' },
        { value: '04', label: 'AI prodüksiyon' },
        { value: 'C1', label: 'İngilizce' },
      ],
      cv: "CV'yi indir",
    },
    contact: {
      kicker: '06 — İletişim',
      title: 'Sıradaki iş birlikte olsun.',
      body:
        'Bir film fikri, bir reklam projesi ya da IT operasyonlarında bir el uzatma... Kısa bir not yeter.',
      emailLabel: 'E-posta',
      copy: 'Kopyala',
      copied: 'Kopyalandı',
      phoneLabel: 'Telefon',
      socialLabel: 'Bağlantılar',
      availability: 'Yeni projelere açık',
      timeLabel: 'Türkiye saati',
      cv: "CV'yi indir",
    },
    footer: {
      tagline: 'AI film & IT operasyonları.',
      rights: 'Tüm hakları saklıdır.',
      top: 'Yukarı dön',
      built: 'Tasarım & kod — Musab Nedim Mutlu',
    },
    common: {
      play: 'Oynat',
      close: 'Kapat',
      next: 'Sonraki',
      previous: 'Önceki',
      of: '/',
      open: 'Aç',
      skip: 'İçeriğe geç',
      videoError: 'Video yüklenemedi. Dosyayı kontrol edin.',
    },
  },
  en: {
    meta: {
      title: 'Musab Nedim Mutlu — AI Filmmaker & IT Operations Specialist',
      description:
        'Portfolio of Musab Nedim Mutlu: cinematic films and commercials made with AI, backed by hands-on experience in high-volume IT operations.',
    },
    nav: {
      work: 'Work',
      projects: 'Projects',
      skills: 'Skills',
      experience: 'Experience',
      about: 'About',
      contact: 'Contact',
      cv: 'CV',
      menu: 'Menu',
      close: 'Close',
    },
    hero: {
      eyebrow: 'AI Filmmaker & IT Operations Specialist',
      titleLines: [
        [{ text: 'Turning ideas' }],
        [{ text: 'into images, images' }],
        [{ text: 'into ' }, { text: 'impact.', em: true }],
      ],
      body:
        'I make cinematic films and commercials with AI — and keep systems, processes and people running in high-volume IT operations.',
      primary: 'Watch the showreel',
      secondary: 'See the work',
      status: 'Open for select projects',
      location: 'Türkiye',
      timezone: 'UTC+3',
      reelLabel: 'SHOWREEL 2026',
      reelMeta: '05 videos · 00:26',
      scroll: 'Scroll',
      metrics: [
        { value: '3+', label: 'years in IT' },
        { value: '95%+', label: 'SLA compliance' },
        { value: '1,000+', label: 'users supported' },
      ],
    },
    work: {
      kicker: '01 — Video Works',
      title: 'Video Works.',
      body:
        'Films and commercials made with AI. Each one started as an idea; light, motion and editing finished the sentence.',
      count: 'videos',
      open: 'View',
      clientLabel: 'Client',
      gallery: 'Video Works',
      nextKicker: 'Next',
      nextTitle: 'Let the next film start with your idea.',
      nextBody: 'A brand film, an experimental short, or that one frame you cannot get out of your head — let’s talk.',
      nextCta: 'Start a project',
      empty: 'No videos published yet.',
    },
    projects: {
      kicker: '02 — Projects',
      title: 'Code, systems and automation.',
      body:
        'Tools that make IT operations easier, built through AI-assisted development. Every one of them started with a real need.',
      viewRepo: 'View repository',
      completed: 'Completed',
      inProgress: 'In progress',
    },
    skills: {
      kicker: '03 — Skills',
      title: 'Two worlds, one approach.',
      body:
        'Light, motion and narrative on one side; logs, permissions and SLAs on the other. I look for the same thing in both: the clear solution that makes the work easier.',
      hint: 'Choose a discipline to see the detail.',
      toolsLabel: 'Tools I reach for',
    },
    experience: {
      kicker: '04 — Experience',
      title: 'Three years on the floor.',
      body:
        'High-volume service desks, IAM administration and SLA-critical operations. The numbers matter — so do the people behind them.',
      remote: 'Remote',
      present: 'Present',
      educationTitle: 'Education & Languages',
      education: 'Open Education High School',
      educationMeta: 'Ministry of National Education · Graduate',
      languages: [
        { name: 'Turkish', level: 'Native' },
        { name: 'English', level: 'C1 · Professional' },
      ],
    },
    about: {
      kicker: '05 — About',
      title: 'Behind the camera, behind the systems.',
      paragraphs: [
        'I’m Musab, based in Türkiye, working where two worlds meet. One is making images with AI — telling stories through light and motion. The other is keeping systems, permissions and people running in high-volume IT operations.',
        'The two are not that far apart. In both, good work starts with the right question: What are you actually trying to solve? Which detail makes the difference? How should the result feel to the person using it? In AI filmmaking I look for the answer in the edit; in IT, in the logs and the process.',
        'I’m open to new projects, collaborations and remote opportunities.',
      ],
      quote: 'Like a good image, a good system works without announcing itself.',
      caption: 'Musab Nedim Mutlu · Türkiye',
      stats: [
        { value: '3+', label: 'years in IT' },
        { value: '1,000+', label: 'users supported' },
        { value: '04', label: 'AI productions' },
        { value: 'C1', label: 'English' },
      ],
      cv: 'Download CV',
    },
    contact: {
      kicker: '06 — Contact',
      title: 'Let’s make the next one together.',
      body:
        'A film idea, a commercial project, or a hand with IT operations — a short note is enough.',
      emailLabel: 'Email',
      copy: 'Copy',
      copied: 'Copied',
      phoneLabel: 'Phone',
      socialLabel: 'Links',
      availability: 'Open for select projects',
      timeLabel: 'Türkiye time',
      cv: 'Download CV',
    },
    footer: {
      tagline: 'AI film & IT operations.',
      rights: 'All rights reserved.',
      top: 'Back to top',
      built: 'Design & code — Musab Nedim Mutlu',
    },
    common: {
      play: 'Play',
      close: 'Close',
      next: 'Next',
      previous: 'Previous',
      of: '/',
      open: 'Open',
      skip: 'Skip to content',
      videoError: 'Video could not load. Check the file.',
    },
  },
} as const;

export type Copy = (typeof copy)['tr'];
export const tools = [
  'Wan 3.0',
  'Gemini',
  'CapCut',
  'Claude',
  'Cursor',
  'Jira',
  'Zendesk',
  'SAP',
  'Active Directory',
  'Microsoft 365',
];
