'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import NavigationMenu from './NavigationMenu';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Logo - Top Left with spacing */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-10">
        <Link href="/">
          <div className="header-logo relative w-28 h-14 sm:w-28 sm:h-14 md:w-36 md:h-18 cursor-pointer">
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
