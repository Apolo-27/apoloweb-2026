'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import CircularGallery from '@/components/ui/circular-gallery';
import STEMVisitModal from '@/components/STEMVisitModal';

// STEM activity images for the CircularGallery
const stemImages = [
    { image: '/stem/stem-1.webp', text: '' },
    { image: '/stem/stem-2.webp', text: '' },
    { image: '/stem/stem-3.webp', text: '' },
    { image: '/stem/stem-4.webp', text: '' }
];

export default function STEMSectionNew() {
    const { language } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const content = {
        es: {
            subtitle: 'Impacto Educativo',
            title: 'Aportando al',
            titleHighlight: 'Futuro STEM',
            ctaButton: 'Solicita una Visita STEM',
        },
        en: {
            subtitle: 'Educational Impact',
            title: 'Contributing to the',
            titleHighlight: 'STEM Future',
            ctaButton: 'Request a STEM Visit',
        }
    };

    const t = content[language];

    return (
        <>
            <section
                id="stem"
                className="relative w-full stem-section-top-spacing"
            >
                {/* Title Section */}
                {/* Title + Gallery Container */}
                <div
                    className="stem-gallery-container flex flex-col items-center justify-center pt-20"
                >
                    <div className="text-center mb-0 relative z-10 pointer-events-none">
                        <p className="text-zinc-400 text-xs sm:text-sm font-light tracking-[0.3em] uppercase mb-4">
                            {t.subtitle}
                        </p>
                        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {t.title}{' '}
                            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                                {t.titleHighlight}
                            </span>
                        </h2>
                    </div>

                    {/* Circular Gallery with tilted photos */}
                    <CircularGallery
                        bend={3}
                        textColor="#ffffff"
                        borderRadius={0.05}
                        items={stemImages}
                    />
                </div>

                {/* CTA Button - Exact same style as Footer but larger for this section */}
                <div className="w-full flex justify-center items-center pb-12 relative z-20 force-stem-spacing px-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="stem-cta-btn group relative border border-red-500 bg-transparent text-red-500 font-semibold text-center overflow-hidden transition-all duration-300 ease-out hover:text-white hover:border-red-400 rounded-sm w-full sm:w-auto"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                        <span className="relative z-10">{t.ctaButton}</span>
                    </button>
                </div>
            </section>

            {/* STEM Visit Modal */}
            <STEMVisitModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
