import { useCallback, useState } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Nav } from './components/Nav';
import { Projects } from './components/Projects';
import { ScrollProgress } from './components/ScrollProgress';
import { Skills } from './components/Skills';
import { VideoModal } from './components/VideoModal';
import { Work } from './components/Work';
import { videos, type VideoWork } from './content/videos';
import { LocaleProvider, useLocale } from './lib/locale';

function Portfolio() {
  const { t } = useLocale();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openVideo = useCallback((video: VideoWork) => {
    const index = videos.findIndex((item) => item.id === video.id);
    setActiveIndex(index >= 0 ? index : 0);
  }, []);

  const openShowreel = useCallback(() => {
    const index = videos.findIndex((video) => video.kind === 'showreel');
    setActiveIndex(index >= 0 ? index : 0);
  }, []);

  const navigate = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const close = useCallback(() => setActiveIndex(null), []);

  return (
    <>
      <a className="skip-link" href="#main">
        {t.common.skip}
      </a>

      <ScrollProgress />
      <Nav />

      <main id="main">
        <Hero onOpenShowreel={openShowreel} />
        <Marquee />
        <Work onOpenVideo={openVideo} />
        <Projects />
        <Skills />
        <Experience />
        <About />
        <Contact />
      </main>

      <Footer />

      <VideoModal
        videos={videos}
        activeIndex={activeIndex}
        onClose={close}
        onNavigate={navigate}
      />
    </>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <Portfolio />
    </LocaleProvider>
  );
}
