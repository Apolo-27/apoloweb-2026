'use client';

import { createContext, useContext, useCallback, ReactNode } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import esTranslations from '@/locales/es.json';
import enTranslations from '@/locales/en.json';

type Language = 'es' | 'en';
type Translations = typeof esTranslations;

interface LanguageContextType {
    language: Language;
    translations: Translations;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Translations> = {
    es: esTranslations,
    en: enTranslations,
};

// Replaced legacy detection with URL-driven logic

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();

    const urlLang = params?.lang as string;
    const language: Language = (urlLang === 'es' || urlLang === 'en') ? urlLang : 'es';

    const setLanguage = useCallback((lang: Language) => {
        if (!pathname) return;
        // Split pathname and replace the first segment (which is the lang)
        const segments = pathname.split('/');
        segments[1] = lang;
        const newPath = segments.join('/') + (window.location.search || '');
        router.push(newPath);
    }, [pathname, router]);

    // Translation function - supports nested keys like "hero.title"
    const t = useCallback((key: string): string => {
        const keys = key.split('.');
        let value: unknown = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = (value as Record<string, unknown>)[k];
            } else {
                return key; // Return the key if translation not found
            }
        }

        return typeof value === 'string' ? value : key;
    }, [language]);

    return (
        <LanguageContext.Provider
            value={{
                language,
                translations: translations[language],
                setLanguage,
                t
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

