import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { copy, type Locale } from '../content/site';

type CopyShape = (typeof copy)[Locale];

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: CopyShape;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale | null {
  try {
    const stored = window.localStorage.getItem('mnm-locale');
    if (stored === 'tr' || stored === 'en') return stored;
  } catch {
    // Storage can be blocked in private or embedded contexts.
  }
  return null;
}

function detectLocale(): Locale {
  const stored = readStoredLocale();
  if (stored) return stored;
  const language = window.navigator.language?.toLowerCase() ?? '';
  return language.startsWith('tr') ? 'tr' : 'en';
}

function updateMeta(locale: Locale) {
  const meta = copy[locale].meta;
  document.title = meta.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', meta.description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', meta.title);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute('content', meta.description);

  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) ogLocale.setAttribute('content', locale === 'tr' ? 'tr_TR' : 'en_US');
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale());

  useEffect(() => {
    document.documentElement.lang = locale;
    updateMeta(locale);
    try {
      window.localStorage.setItem('mnm-locale', locale);
    } catch {
      // Ignore storage failures; the site still works for this session.
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => (current === 'tr' ? 'en' : 'tr'));
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, t: copy[locale] }),
    [locale, setLocale, toggleLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used inside LocaleProvider');
  return context;
}
