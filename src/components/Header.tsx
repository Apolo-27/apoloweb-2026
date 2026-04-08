'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import NavigationMenu from './NavigationMenu';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const { language } = useLanguage();
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Logo - Top Left with spacing */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-10">
        <Link href={`/${language}`}>
          <div className="flex items-center gap-3 md:gap-4 relative group w-[115px] h-[45px] sm:w-[130px] sm:h-[52px] md:w-[165px] md:h-[58px] hover:scale-105 transition-all duration-300">
            <Image
              src="/images/Apolo 27 HP - blanco.png"
              alt="Apolo 27 Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Right Side Controls - Language Switcher & Navigation Menu */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-10 flex items-center gap-3 sm:gap-4">
        <LanguageSwitcher />
        <NavigationMenu />
      </div>
    </motion.header>
  );
}
