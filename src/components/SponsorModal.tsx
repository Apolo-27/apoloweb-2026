'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { X } from 'lucide-react';

interface SponsorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    companyName: string;
    email: string;
    phone: string;
    socialLink: string;
    companyActivity: string;
    description: string;
}

const initialFormData: FormData = {
    companyName: '',
    email: '',
    phone: '',
    socialLink: '',
    companyActivity: '',
    description: '',
};

export default function SponsorModal({ isOpen, onClose }: SponsorModalProps) {
    const { language } = useLanguage();
    const modalRef = useRef<HTMLDivElement>(null);
    const firstInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const content = {
        es: {
            title: 'Conviértete en Sponsor',
            companyName: 'Nombre de la compañía',
            companyPlaceholder: 'Ingresa el nombre de la compañía',
            email: 'Correo electrónico',
            emailPlaceholder: 'correo@ejemplo.com',
            phone: 'Teléfono',
            phonePlaceholder: '+1 (809) 000-0000',
            socialLink: 'Link de red social',
            socialPlaceholder: 'https://instagram.com/tu-empresa (opcional)',
            companyActivity: '¿A qué se dedica la compañía?',
            activityPlaceholder: 'Selecciona una opción',
            activityOptions: [
                { value: 'technology', label: 'Tecnología' },
                { value: 'manufacturing', label: 'Manufactura' },
                { value: 'education', label: 'Educación' },
                { value: 'finance', label: 'Finanzas y Banca' },
                { value: 'healthcare', label: 'Salud' },
                { value: 'construction', label: 'Construcción' },
                { value: 'retail', label: 'Comercio / Retail' },
                { value: 'food', label: 'Alimentos y Bebidas' },
                { value: 'automotive', label: 'Automotriz' },
                { value: 'energy', label: 'Energía' },
                { value: 'telecommunications', label: 'Telecomunicaciones' },
                { value: 'logistics', label: 'Logística y Transporte' },
                { value: 'real_estate', label: 'Bienes Raíces' },
                { value: 'consulting', label: 'Consultoría' },
                { value: 'marketing', label: 'Marketing y Publicidad' },
                { value: 'legal', label: 'Legal' },
                { value: 'nonprofit', label: 'ONG / Sin fines de lucro' },
                { value: 'other', label: 'Otro' },
            ],
            description: '¿Por qué le gustaría ser nuestro sponsor?',
            descriptionPlaceholder: 'Cuéntanos por qué te gustaría apoyar a APOLO 27 y cómo te gustaría colaborar...',
            cancel: 'Cancelar',
            submit: 'Enviar Solicitud',
            submitting: 'Enviando...',
            successTitle: '¡Solicitud Enviada!',
            successMessage: 'Nos pondremos en contacto contigo pronto.',
            errorMessage: 'Hubo un error. Por favor, intenta de nuevo.',
            close: 'Cerrar',
            contactNote: 'Nos estaremos comunicando con ustedes a la brevedad posible.',
        },
        en: {
            title: 'Become a Sponsor',
            companyName: 'Company name',
            companyPlaceholder: 'Enter company name',
            email: 'Email address',
            emailPlaceholder: 'email@example.com',
            phone: 'Phone number',
            phonePlaceholder: '+1 (809) 000-0000',
            socialLink: 'Social media link',
            socialPlaceholder: 'https://instagram.com/your-company (optional)',
            companyActivity: 'What does the company do?',
            activityPlaceholder: 'Select an option',
            activityOptions: [
                { value: 'technology', label: 'Technology' },
                { value: 'manufacturing', label: 'Manufacturing' },
                { value: 'education', label: 'Education' },
                { value: 'finance', label: 'Finance & Banking' },
                { value: 'healthcare', label: 'Healthcare' },
                { value: 'construction', label: 'Construction' },
                { value: 'retail', label: 'Retail / Commerce' },
                { value: 'food', label: 'Food & Beverage' },
                { value: 'automotive', label: 'Automotive' },
                { value: 'energy', label: 'Energy' },
                { value: 'telecommunications', label: 'Telecommunications' },
                { value: 'logistics', label: 'Logistics & Transportation' },
                { value: 'real_estate', label: 'Real Estate' },
                { value: 'consulting', label: 'Consulting' },
                { value: 'marketing', label: 'Marketing & Advertising' },
                { value: 'legal', label: 'Legal' },
                { value: 'nonprofit', label: 'NGO / Nonprofit' },
                { value: 'other', label: 'Other' },
            ],
            description: 'Why would you like to be our sponsor?',
            descriptionPlaceholder: 'Tell us why you would like to support APOLO 27 and how you would like to collaborate...',
            cancel: 'Cancel',
            submit: 'Submit Request',
            submitting: 'Submitting...',
            successTitle: 'Request Sent!',
            successMessage: 'We will contact you soon.',
            errorMessage: 'There was an error. Please try again.',
            close: 'Close',
            contactNote: 'We will be in touch with you as soon as possible.',
        }
    };

    const t = content[language];

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => firstInputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';

            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };

            document.addEventListener('keydown', handleEscape);
            return () => {
                document.removeEventListener('keydown', handleEscape);
                document.body.style.overflow = 'unset';
            };
        }
    }, [isOpen, onClose]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Sponsor form submitted:', formData);
            setSubmitStatus('success');
            setFormData(initialFormData);
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setSubmitStatus('idle');
        setFormData(initialFormData);
        onClose();
    };

    if (typeof document === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="stem-modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleClose}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="sponsor-modal-title"
                >
                    {/* Modal Content */}
                    <motion.div
                        ref={modalRef}
                        className="stem-modal"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="stem-modal-header">
                            <h2 id="sponsor-modal-title" className="stem-modal-title">
                                {t.title}
                            </h2>
                            <button
                                onClick={handleClose}
                                className="stem-modal-close"
                                aria-label={t.close}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form or Success Message */}
                        {submitStatus === 'success' ? (
                            <motion.div
                                className="stem-modal-success"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="stem-modal-success-icon">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="stem-modal-success-title">
                                    {t.successTitle}
                                </h3>
                                <p className="stem-modal-success-message">
                                    {t.successMessage}
                                </p>
                                <button
                                    onClick={handleClose}
                                    className="stem-modal-btn stem-modal-btn-submit"
                                >
                                    {t.close}
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="stem-modal-form">
                                {/* Company Name */}
                                <div className="stem-modal-field">
                                    <label className="stem-modal-label">
                                        {t.companyName}
                                    </label>
                                    <input
                                        ref={firstInputRef}
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder={t.companyPlaceholder}
                                        required
                                        className="stem-modal-input"
                                    />
                                </div>

                                {/* Email and Phone Row */}
                                <div className="stem-modal-row">
                                    <div className="stem-modal-field">
                                        <label className="stem-modal-label">
                                            {t.email}
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder={t.emailPlaceholder}
                                            required
                                            className="stem-modal-input"
                                        />
                                    </div>
                                    <div className="stem-modal-field">
                                        <label className="stem-modal-label">
                                            {t.phone}
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder={t.phonePlaceholder}
                                            required
                                            className="stem-modal-input"
                                        />
                                    </div>
                                </div>

                                {/* Social Link */}
                                <div className="stem-modal-field">
                                    <label className="stem-modal-label">
                                        {t.socialLink}
                                    </label>
                                    <input
                                        type="url"
                                        name="socialLink"
                                        value={formData.socialLink}
                                        onChange={handleChange}
                                        placeholder={t.socialPlaceholder}
                                        className="stem-modal-input"
                                    />
                                </div>

                                {/* Company Activity */}
                                <div className="stem-modal-field">
                                    <label className="stem-modal-label">
                                        {t.companyActivity}
                                    </label>
                                    <select
                                        name="companyActivity"
                                        value={formData.companyActivity}
                                        onChange={handleChange}
                                        required
                                        className="stem-modal-input stem-modal-select"
                                    >
                                        <option value="" disabled>{t.activityPlaceholder}</option>
                                        {t.activityOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Description */}
                                <div className="stem-modal-field">
                                    <label className="stem-modal-label">
                                        {t.description}
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder={t.descriptionPlaceholder}
                                        rows={4}
                                        required
                                        className="stem-modal-textarea"
                                    />
                                </div>

                                {/* Error Message */}
                                {submitStatus === 'error' && (
                                    <div className="stem-modal-error">
                                        {t.errorMessage}
                                    </div>
                                )}

                                {/* Contact Note */}
                                <p style={{
                                    color: '#71717a',
                                    fontSize: '12px',
                                    textAlign: 'center',
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                    letterSpacing: '0.05em',
                                    margin: '8px 0 0',
                                }}>
                                    {t.contactNote}
                                </p>

                                {/* Action Buttons */}
                                <div className="stem-modal-actions">
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="stem-modal-btn stem-modal-btn-cancel"
                                    >
                                        {t.cancel}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="stem-modal-btn stem-modal-btn-submit"
                                    >
                                        {isSubmitting ? t.submitting : t.submit}
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
