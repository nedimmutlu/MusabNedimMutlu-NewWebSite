# Musab Nedim Mutlu — Portföy

Sinematik, koyu temalı, iki dilli (TR/EN) kişisel portföy. React + Vite + TypeScript ile statik olarak derleniyor; çalışma anında sunucu veya veritabanı yok.

- **Adres:** https://musabnedimmutlu.com
- **Barındırma:** Vercel (yeni hesap)
- **İçerik düzenleme:** Pages CMS (tarayıcıdan) → GitHub → Vercel otomatik yeniden derler

---

## Siteyi istediğin gibi düzenleme özgürlüğü

Sitede gördüğün **içerik** (videolar, deneyim, projeler, beceriler, sayılar, iletişim bilgileri, portre fotoğrafı) tek tek JSON dosyalarında duruyor ve **kod bilmeden** tarayıcıdan değiştirilebiliyor. Arayüz etiketleri (`site.ts`) ise kodda; onlar nadiren değişir.

### İçerik dosyaları

| Ne | Dosya | Nerede görünüyor |
| --- | --- | --- |
| İletişim, sosyal, CV, portre, paylaşım görseli | `src/content/profile.json` | Nav, İletişim, CV indirme |
| Videolar + showreel | `src/content/videos.json` | İşler bölümü, modal, hero showreel |
| Deneyim | `src/content/experience.json` | Deneyim bölümü |
| Projeler | `src/content/projects.json` | Projeler bölümü |
| Beceriler | `src/content/skills.json` | Beceriler bölümü |
| Sayılar | `src/content/metrics.json` | İstatistik bandı |

Medya dosyaları:

- `public/media/portrait.jpg` — portre (headshot)
- `public/media/og-image.jpg` — sosyal paylaşım görseli (1200×630)
- `public/media/videos/*.mp4` — videolar
- `public/media/posters/*.jpg` — video kapakları
- `public/cv/*.pdf` — CV

### 1) Tarayıcıdan düzenleme — Pages CMS (önerilen)

1. [app.pagescms.org](https://app.pagescms.org) → GitHub ile giriş yap, GitHub App'i siteyi barındıran repoya kur.
2. Repoyu aç; kökteki `.pages.yml` otomatik okunur (profil, videolar, deneyim, projeler, beceriler, sayılar düzenlenebilir).
3. Değişikliği kaydet → Pages CMS doğrudan GitHub'a commit atar → Vercel otomatik yeniden derler (1–2 dk içinde yayında).

**Yeni video eklemek (Pages CMS):**

1. `public/media/videos` klasörüne MP4 yükle (medya paneli, "Videos" kaynağı). Öneri: 1920×1080 (yatay) veya 720×1280 (dikey), h264, ~5–25 MB.
2. `public/media/posters` klasörüne kapak JPG'si yükle (veya eski bir kapağı kopyala).
3. "Videolar & showreel" listesine yeni kayıt ekle; `id` (küçük harf + tire, ör. `marka-filmi`), başlık TR/EN, kategori, yön (landscape/portrait), süre, yıl, araçlar doldur.
4. `Yayında` anahtarını aç. Kaydet → yayında.

**Yeni deneyim eklemek:** "Deneyim" listesine kayıt ekle; pozisyon (TR/EN), şirket, dönem, maddeler. Sıra listedeki sıraya göredir — en yeniyi en üste taşımak için kayıtları yeniden sırala.

**Portre değiştirmek:** "Profil & iletişim" → `portrait.jpg` alanına yeni fotoğraf yükle (yüksek çözünürlük, dikey). Sayfa otomatik kırpar. Yeni fotoğraf `public/media/portrait.jpg` üzerine yazılır; cache 1 gün olduğundan eski görsel bir süre görünebilir — aynı adı taşıması önemli çünkü kod bu yolu arar.

> Not: Sayılar (`metrics.json`) "Sayılar" menüsünden; eğitim/dil bilgileri ve arayüz metinleri şimdilik `src/content/site.ts` içinde.

### 2) Terminalden video ekleme — CLI yardımcısı

Videoyu sıkıştırıp kapak üretip kaydı otomatik ekler. **ffmpeg kurulu olmalı.**

```bash
npm run add:video -- "D:\YapayZekaÇalışmaları\ReklamÇalışmaları\Nedim.mp4" --title "Nedim" --category film
```

Seçenekler için `npm run add:video -- --help`. Yeni kayıt **taslak** (published:false) eklenir; başlık/açıklamayı Pages CMS'te tamamlayıp "Yayında" anahtarını aç.

### 3) Showreel'i güncelleme

Hero'daki showreel `public/media/videos/showreel.mp4`. Yeni bir kurgu yaptığında aynı adla değiştir (16:9, sessiz önerilir); süreyi `videos.json` içindeki `showreel-2026` kaydındaki `duration` alanında güncelle.

### 4) Paylaşım görselini (OG) yenileme

`public/media/og-image.jpg` sosyal medya paylaşımlarında görünür. Yenilemek için:

```bash
npm run dev
```

sonra tarayıcıda `http://localhost:5173/og.html` açıp 1200×630 alanı yakala ve `public/media/og-image.jpg` üzerine yaz.

---

## Geliştirme

```bash
npm install        # bağımlılıklar
npm run dev        # http://localhost:5173
npm run build      # tip kontrolü + üretim derlemesi (dist/)
npm run preview    # derlenmiş sürümü önizle
npm run lint       # yalnızca tip kontrolü
```

`public/preview.html?w=390&h=844` genişlik kontrolü için test teçhizatıdır (üretimde zararsız).

### Yapı

```
index.html            → SEO/OG/JSON-LD (dil meta bilgileri)
src/content/          → düzenlenebilir JSON içerik + arayüz kopyası (site.ts)
src/components/       → bölümler
src/lib/              → dil, clock, hook'lar
scripts/add-video.mjs → CLI video ekleme
.pages.yml            → Pages CMS şeması
vercel.json           → başlıklar, cache, CSP
```

---

## Yayın akışı (GitHub + Vercel + Pages CMS)

### 1. GitHub deposu

1. Yeni bir repo aç (ör. `nedimmutlu/musabnedimmutlu-portfolio` veya yeni hesapta; eski `MusabNedimMutlu` reposu yedek olarak **dokunulmadan** duruyor).
2. Bu klasörü push'la:

```bash
git init -b main
git add .
git commit -m "Yeni portföy"
git remote add origin https://github.com/<kullanıcı>/<repo>.git
git push -u origin main
```

> Video boyutları: toplam repo ~66 MB. GitHub tek dosya sınırı 100 MB; repo ~1 GB'a kadar rahat çalışır. Videoları ekledikçe boyutu gözle; gerekirse eski işleri `published:false` yapıp dosyayı repodan silebilirsin (geçmişiyle birlikte kalacağı için şişen repo olursa yeni repo açmak en temizi).

### 2. Pages CMS bağla

[app.pagescms.org](https://app.pagescms.org) → GitHub ile giriş → GitHub App'i yeni repoya kur → repo aç. `.pages.yml` hazır; düzenlemeye hemen başlayabilirsin.

### 3. Yeni Vercel hesabına deploy

1. Yeni bir Vercel hesabı aç (yeni e-posta veya GitHub ile).
2. **Add New → Project** → yeni GitHub reposunu içe aktar. Çatı otomatik (Vite) algılanır; `vercel.json` ayarları zaten repo içinde.
3. Deploy bitince `<proje>.vercel.app` adresinde siteyi **iyice test et** (TR/EN, videolar, modal, mobil).

### 4. Alan adını taşı (son adım)

Eski site ve eski Vercel hesabı, taşıma doğrulanana kadar **yedek** olarak aynen kalsın.

1. Eski Vercel hesabında: Proje → Settings → Domains → `musabnedimmutlu.com` ve `www` kayıtlarını sil (önce not al).
2. Yeni Vercel hesabında proje → Settings → Domains → `musabnedimmutlu.com` ekle ve `www` yönlendirmesini onayla.
3. Alan adı "başka hesapta kullanımda" uyarısı verirse Vercel'in gösterdiği `_vercel` TXT kaydını eski hesaptaki DNS'te (Domains → musabnedimmutlu.com → DNS Records) doğrula.
4. Nameserver'lar zaten `ns1.vercel-dns.com` / `ns2.vercel-dns.com` olduğundan kayıt cihazında değişiklik gerekmez. Apex A kayıtları Vercel DNS'te `64.29.17.65` / `216.198.79.65` olarak mevcut olmalı.
5. SSL sertifikası otomatik çıkar; `https://musabnedimmutlu.com` yeni siteyi gösterene kadar bekle (genelde dakikalar). Düzgün çalıştığını görmeden eski projeyi silme.

> Alternatif: Eski hesapta Vercel CLI ile `vercel domains move musabnedimmutlu.com <yeni-kullanıcı-slug>` komutu da aynı işi yapar.

### Kontrol listesi (taşıma sonrası)

- [ ] `musabnedimmutlu.com` ve `www` yeni siteyi gösteriyor
- [ ] Video kartları, filtreler, modal çalışıyor
- [ ] TR/EN geçişi ve mobil menü çalışıyor
- [ ] CV indirme ve portre görünüyor
- [ ] Paylaşım görseli (og-image) sosyal medyada doğru
- [ ] Eski GitHub reposu ve eski Vercel projesi yedekte duruyor
