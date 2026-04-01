'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter, usePathname } from 'next/navigation';

type NavItem = {
    id: string;
    labelEs: string;
    labelEn: string;
    type: 'scroll' | 'route';
    path?: string;
};

const navItems: NavItem[] = [
    { id: 'hero', labelEs: 'INICIO', labelEn: 'HOME', type: 'scroll' },
    { id: 'save-the-date', labelEs: 'EVENTO', labelEn: 'EVENT', type: 'scroll' },
    { id: 'timeline', labelEs: 'NUESTRA HISTORIA', labelEn: 'OUR HISTORY', type: 'scroll' },
    { id: 'sponsors', labelEs: 'ALIADOS', labelEn: 'SPONSORS', type: 'scroll' },
    { id: 'stem', labelEs: 'VISITAS STEM', labelEn: 'STEM VISITS', type: 'scroll' },
    { id: 'social', labelEs: 'REDES', labelEn: 'SOCIAL', type: 'scroll' },
];

const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/apolo27' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/apolo27' },
    { name: 'YouTube', url: 'https://www.youtube.com/@apolo2730' },
    { name: 'TikTok', url: 'https://tiktok.com/@apolo27' },
];

export default function NavigationMenu() {
    const { language } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('hero');

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [isOpen]);

    const handleNavClick = (item: NavItem) => {
        setIsOpen(false);

        if (item.type === 'route' && item.path) {
            router.push(`/${language}${item.path}`);
            setActiveItem(item.id);
            return;
        }

        // Scroll logic
        if (pathname !== `/${language}` && pathname !== `/${language}/`) {
            router.push(`/${language}/#${item.id}`);
            // Note: Active item state might reset on navigation, which is expected behavior
        } else {
            const element = document.getElementById(item.id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            setActiveItem(item.id);
        }
    };

    // Get label based on current language
    const getLabel = (item: typeof navItems[0]) => {
        return language === 'es' ? item.labelEs : item.labelEn;
    };

    return (
        <div className="relative">
            {/* Hamburger Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group z-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle navigation menu"
            >
                <motion.span
                    className="w-6 h-[2px] bg-white/70 group-hover:bg-white transition-all duration-300 rounded-full"
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                    className="w-6 h-[2px] bg-white/70 group-hover:bg-white transition-all duration-300 rounded-full"
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                    className="w-6 h-[2px] bg-white/70 group-hover:bg-white transition-all duration-300 rounded-full"
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                />
            </motion.button>

            {/* Full Navigation Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Slide-out Panel */}
                        <motion.nav
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            className="fixed top-0 right-0 h-full w-full sm:w-[85%] md:w-[50%] lg:w-[35%] xl:w-[30%] bg-zinc-950 z-50 flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 sm:px-8 md:px-10 lg:px-12 pt-6 sm:pt-8 pb-4 mx-8 mt-8">
                                {/* Menu Label */}
                                <div className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500" />
                                    <span className="text-white/70 text-xs sm:text-sm tracking-[0.2em] uppercase font-light">
                                        Menu
                                    </span>
                                </div>

                                {/* Close Button - Thin X */}
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeWidth={1} d="M6 6l12 12M18 6L6 18" />
                                    </svg>
                                </motion.button>
                            </div>

                            {/* Navigation Items - With divider lines and more spacing */}
                            <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 md:px-10 lg:px-12 overflow-y-auto">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.08 }}
                                    >
                                        <button
                                            onClick={() => handleNavClick(item)}
                                            className="group relative text-left w-full py-3 sm:py-4"
                                        >
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <span className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight transition-colors duration-300 ${activeItem === item.id
                                                    ? 'text-white'
                                                    : 'text-white/30 group-hover:text-white/80'
                                                    }`}>
                                                    {getLabel(item)}
                                                </span>
                                                {/* Active Indicator - Red square after text */}
                                                {activeItem === item.id && (
                                                    <motion.span
                                                        layoutId="activeIndicator"
                                                        className="ml-2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 flex-shrink-0"
                                                        initial={false}
                                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                    />
                                                )}
                                            </div>
                                        </button>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer - Contact & Socials */}
                            <div className="pl-8 sm:pl-10 lg:pl-12 pr-6 py-8 sm:py-10 border-t border-white/10 ">
                                {/* Email */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="mb-8 gap-3"
                                >
                                    <span className="text-white/40 text-xs sm:text-sm tracking-[0.15em] uppercase block mb-3">
                                        (EMAIL)
                                    </span>
                                    <a
                                        href="mailto:apolo27rd@outlook.com"
                                        className="text-red-500 hover:text-red-400 text-lg sm:text-xl lg:text-2xl transition-colors font-light"
                                    >
                                        apolo27rd@outlook.com
                                    </a>
                                </motion.div>

                                {/* Social Links */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <span className="text-white/40 text-xs sm:text-sm tracking-[0.15em] uppercase block mb-4">
                                        (SOCIALS)
                                    </span>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                        {socialLinks.map((social) => (
                                            <a
                                                key={social.name}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white/50 hover:text-white text-base sm:text-lg transition-colors flex items-center gap-2 group"
                                            >
                                                {social.name}
                                                <svg
                                                    className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                                                </svg>
                                            </a>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
