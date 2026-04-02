'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

// Animation variants for staggered children
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 }
    }
};

const titleVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 1.2 }
    }
};

const astronautVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 100 },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: { duration: 1.5, delay: 0.5 }
    }
};

export default function HeroSection() {
    const { t } = useLanguage();

    return (
        <section id="hero" className="relative w-full h-screen overflow-hidden bg-black">
            {/* Video Background - Optimized for fast loading */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0 overflow-hidden"
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/images/moon_poster.jpg"
                    className="absolute inset-0 w-full h-full object-cover scale-[1.15]"
                >
                    <source src="/videos/moon_cinematic5.webm" type="video/webm" />
                    {/* <source src="/videos/moon_cinematic4.webm" type="video/webm" /> */}
                    <source src="/videos/moon_cinematic3.mp4" type="video/mp4" />
                </video>
                {/* Dark overlay - stronger for better readability */}
                <div className="absolute inset-0 bg-black/60 sm:bg-black/55 md:bg-black/50"></div>
                {/* Bottom fade gradient - smooth transition to next section */}
                <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-56 md:h-64 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            </motion.div>

            {/* Astronaut - Floating animation - Offset to the right */}
            <motion.div
                variants={astronautVariants}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            >
                <motion.div
                    className="relative w-[65vw] sm:w-[70vw] md:w-[55vw] lg:w-[45vw] aspect-[3/4] mt-0 sm:mt-[-5vh] md:mt-[-10vh] translate-x-[20%] sm:translate-x-[25%] md:translate-x-[30%] lg:translate-x-[35%]"
                    animate={{
                        y: [0, -15, 0],
                        rotate: [0, 1, 0, -1, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Image
                        src="/images/calidad_astronaut.png"
                        alt="Astronaut floating in space"
                        fill
                        className="object-contain mix-blend-screen"
                        style={{
                            filter: 'brightness(1.2) contrast(1.15)'
                        }}
                        priority
                    />
                </motion.div>
            </motion.div>

            {/* Content Container - CENTERED and responsive */}
            <div className="relative z-20 h-full w-full flex items-center justify-center px-6 sm:px-6 md:px-8">

                {/* Main Text Block - Staggered animations */}
                <motion.div
                    className="flex flex-col items-start hero-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Since Label */}
                    <motion.p
                        variants={itemVariants}
                        className="hero-label text-orange-500 text-xs sm:text-xs md:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-2 sm:mb-2"
                    >
                        {t('hero.since')}
                    </motion.p>

                    {/* "Meet the crew" Line */}
                    <motion.div
                        variants={itemVariants}
                        className="hero-subtitle flex items-baseline gap-2 sm:gap-3 md:gap-4"
                    >
                        <span
                            className="text-white text-2xl sm:text-4xl md:text-6xl lg:text-8xl italic"
                            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                        >
                            {t('hero.meetThe')}
                        </span>
                        <span className="text-white text-xl sm:text-3xl md:text-5xl lg:text-7xl font-light">
                            {t('hero.crew')}
                        </span>
                    </motion.div>

                    {/* APOLO 27 Title */}
                    <motion.h1
                        variants={titleVariants}
                        className="hero-title text-white text-[12vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] font-bold leading-[0.85] tracking-tight select-none relative z-30 ml-[-0.03em]"
                        style={{
                            fontFamily: 'Arial Black, Arial, sans-serif',
                            textShadow: '0 0 60px rgba(255, 255, 255, 0.3), 0 0 100px rgba(255, 100, 50, 0.2)'
                        }}
                        whileHover={{
                            textShadow: '0 0 80px rgba(255, 255, 255, 0.5), 0 0 150px rgba(255, 100, 50, 0.4)',
                            transition: { duration: 0.3 }
                        }}
                    >
                        {t('hero.title')}
                    </motion.h1>
                </motion.div>
            </div>
        </section >
    );
}
