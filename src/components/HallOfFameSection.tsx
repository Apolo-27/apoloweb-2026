'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export default function HallOfFameSection() {
    const { language } = useLanguage();
    const router = useRouter();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Localized text content
    const texts = {
        es: {
            title: "LEGADO DE INGENIERÍA",
            subtitle: "Especificaciones de diseño integrales y registros de rendimiento de misión (HERC)",
            currentGen: "GEN ACTUAL",
            awards: "PREMIOS Y HONORES NASA",
            enterDb: "ACCEDER A LA BASE DE DATOS COMPLETA DE ROVERS"
        },
        en: {
            title: "ENGINEERING LEGACY",
            subtitle: "Comprehensive design specifications and mission performance records (HERC)",
            currentGen: "CURRENT GEN",
            awards: "NASA AWARDS & HONORS",
            enterDb: "ACCESS FULL ROVER DATABASE"
        }
    };
    
    // Fallback to English if language is undefined or not 'es'
    const content = texts[language as 'es' | 'en'] || texts.en;

    const rovers = [
        {
            id: 'mk-v',
            name: 'ROVER RC',
            year: '2025',
            specId: 'HERC-25-A',
            awards: [
                { title: '1st Place Featherweight', type: 'featherweight' },
                { title: '2nd Place Design', type: 'design' },
            ],
            image: '/rovers/rover_rc_blueprint.png',
            isCurrent: true
        },
        {
            id: 'mk-iv',
            name: 'ROVER HP',
            year: '2025',
            specId: 'HERC-25-B',
            awards: [
                { title: '1st Place Performance', type: 'performance' },
            ],
            image: '/rovers/rover_hp_blueprint.png',
            isCurrent: false
        }
    ];

    const handleEnterClick = () => {
        router.push(`/${language}/hall-of-fame`);
    };

    return (
        <section
            id="hall-of-fame"
            ref={sectionRef}
            className="hall-of-fame-section flex-col"
        >
            {/* Subtle background grid defined in globals.css */}
            <div className="hall-of-fame-grid" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                
                {/* Section Header */}
                <div className="text-center mb-12 flex flex-col items-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
                        <span className="text-[10px] sm:text-xs bg-red-900/30 text-red-500 px-2 py-1 uppercase tracking-[0.2em] font-mono border border-red-500/20">
                            ARCHIVE // NASA_HERC
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase mb-4">
                        {content.title}
                    </h2>
                    <p className="text-zinc-400 text-xs sm:text-sm md:text-base font-mono max-w-2xl mx-auto leading-relaxed">
                        {content.subtitle}
                    </p>
                </div>

                {/* Bento Grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 w-full">
                    {rovers.map((rover, idx) => (
                        <motion.div 
                            key={rover.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ duration: 0.6, delay: idx * 0.2, ease: "easeOut" }}
                            className="group relative bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 p-6 sm:p-8 overflow-hidden transition-colors duration-500 hover:bg-zinc-900/80 hover:border-zinc-700/80 cursor-pointer flex flex-col"
                            onClick={handleEnterClick}
                        >
                            {/* SciFi Corner Brackets */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500/30 group-hover:border-red-500 transition-colors duration-300" />
                            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-500/30 group-hover:border-red-500 transition-colors duration-300" />
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-500/30 group-hover:border-red-500 transition-colors duration-300" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500/30 group-hover:border-red-500 transition-colors duration-300" />

                            {/* Hover Tech Pattern Overlay */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10 w-full">
                                <div>
                                    {rover.isCurrent && (
                                        <div className="bg-red-600/90 text-white text-[9px] px-1.5 py-0.5 font-bold uppercase inline-block mb-2 tracking-widest shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                                            {content.currentGen}
                                        </div>
                                    )}
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wider flex items-center gap-2">
                                        {rover.name} 
                                        <span className="text-zinc-600 text-sm md:text-base font-normal mt-1">[{rover.year}]</span>
                                    </h3>
                                </div>
                                <div className="text-[9px] sm:text-[10px] text-zinc-500 font-mono tracking-widest border border-zinc-800 px-2 py-1 bg-black/50 whitespace-nowrap">
                                    {rover.specId}
                                </div>
                            </div>

                            {/* Image Container */}
                            <div className="relative h-48 sm:h-56 md:h-72 w-full mb-8 flex-grow flex items-center justify-center">
                                {/* Glow behind image */}
                                <div className="absolute inset-0 bg-red-900/0 group-hover:bg-red-900/10 transition-colors duration-700 rounded-full blur-2xl transform scale-75" />
                                
                                <Image
                                    src={rover.image}
                                    alt={rover.name}
                                    fill
                                    className="object-contain opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] filter brightness-90 group-hover:brightness-110 drop-shadow-[0_0_0px_rgba(220,38,38,0)] group-hover:drop-shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={idx === 0}
                                />
                            </div>

                            {/* NASA Awards */}
                            <div className="relative z-10 border-t border-zinc-800/80 pt-5 mt-auto w-full">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-red-500 text-[10px]">🏆</span>
                                    <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-[0.2em]">{content.awards}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {rover.awards.map((award, i) => (
                                        <span key={i} className={cn(
                                            "text-[9px] sm:text-[10px] px-2 py-1 border font-mono tracking-wide",
                                            award.type === 'featherweight' ? "border-yellow-500/30 text-yellow-500 bg-yellow-500/5" :
                                            award.type === 'design' ? "border-red-500/30 text-red-500 bg-red-500/5" :
                                            "border-blue-500/30 text-blue-400 bg-blue-500/5"
                                        )}>
                                            {award.title}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Console CTA Button */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-12 md:mt-16 w-full flex justify-center"
                >
                    <button 
                        onClick={handleEnterClick} 
                        className="group relative flex items-center text-zinc-500 hover:text-red-500 font-mono text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] sm:tracking-[0.3em] transition-all duration-300 border border-zinc-800 hover:border-red-500/50 hover:bg-red-950/20 px-6 sm:px-10 py-4 bg-black/60 overflow-hidden"
                    >
                        {/* Hover scanline effect */}
                        <span className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                        
                        <span className="mr-3 opacity-50 group-hover:opacity-100 group-hover:text-red-500 transition-opacity">{`[>>>`}</span>
                        <span className="relative z-10 transition-colors">{content.enterDb}</span>
                        <span className="ml-3 opacity-50 group-hover:opacity-100 group-hover:text-red-500 transition-opacity">{`<<<]`}</span>
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
