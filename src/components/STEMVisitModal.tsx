'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { X, Calendar, Clock } from 'lucide-react';

interface STEMVisitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    institutionName: string;
    contactName: string;
    email: string;
    phone: string;
    preferredDate: string;
    preferredTime: string;
    message: string;
}

const initialFormData: FormData = {
    institutionName: '',
    contactName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
};

export default function STEMVisitModal({ isOpen, onClose }: STEMVisitModalProps) {
    const { language } = useLanguage();
    const modalRef = useRef<HTMLDivElement>(null);
    const firstInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const content = {
        es: {
            title: 'Solicitar Visita STEM',
            institutionName: 'Nombre de la institución',
            institutionPlaceholder: 'Ingresa el nombre de la institución',
            contactName: 'Persona de contacto',
            contactPlaceholder: 'Tu nombre completo',
            email: 'Correo electrónico',
            emailPlaceholder: 'correo@ejemplo.com',
            phone: 'Teléfono',
            phonePlaceholder: '+1 (809) 000-0000',
            date: 'Fecha preferida',
            time: 'Hora preferida',
            message: 'Mensaje adicional',
            messagePlaceholder: 'Cuéntanos sobre tu institución y el tipo de visita que te interesa...',
            cancel: 'Cancelar',
            submit: 'Enviar Solicitud',
            submitting: 'Enviando...',
            successTitle: '¡Solicitud Enviada!',
            successMessage: 'Nos pondremos en contacto contigo pronto.',
            errorMessage: 'Hubo un error. Por favor, intenta de nuevo.',
            close: 'Cerrar',
        },
        en: {
            title: 'Request STEM Visit',
            institutionName: 'Institution name',
            institutionPlaceholder: 'Enter institution name',
            contactName: 'Contact person',
            contactPlaceholder: 'Your full name',
            email: 'Email address',
            emailPlaceholder: 'email@example.com',
            phone: 'Phone number',
            phonePlaceholder: '+1 (809) 000-0000',
            date: 'Preferred date',
            time: 'Preferred time',
            message: 'Additional message',
            messagePlaceholder: 'Tell us about your institution and the type of visit you are interested in...',
            cancel: 'Cancel',
            submit: 'Submit Request',
            submitting: 'Submitting...',
            successTitle: 'Request Sent!',
            successMessage: 'We will contact you soon.',
            errorMessage: 'There was an error. Please try again.',
            close: 'Close',
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Form submitted:', formData);
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
                    aria-labelledby="modal-title"
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
                            <h2 id="modal-title" className="stem-modal-title">
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
                                {/* Institution Name */}
                                <div className="stem-modal-field">
                                    <label className="stem-modal-label">
                                        {t.institutionName}
                                    </label>
                                    <input
                                        ref={firstInputRef}
                                        type="text"
                                        name="institutionName"
                                        value={formData.institutionName}
                                        onChange={handleChange}
                                        placeholder={t.institutionPlaceholder}
                                        required
                                        className="stem-modal-input"
                                    />
                                </div>

                                {/* Contact Name */}
                                <div className="stem-modal-field">
                                    <label className="stem-modal-label">
                                        {t.contactName}
                                    </label>
                                    <input
                                        type="text"
                                        name="contactName"
                                        value={formData.contactName}
                                        onChange={handleChange}
                                        placeholder={t.contactPlaceholder}
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

                                {/* Date and Time Row */}
                                <div className="stem-modal-row">
                                    <div className="stem-modal-field">
                                        <label className="stem-modal-label">
                                            {t.date}
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type="date"
                                                name="preferredDate"
                                                value={formData.preferredDate}
                                                onChange={handleChange}
                                                className="stem-modal-input stem-modal-input-with-icon"
                                            />
                                            <Calendar className="stem-modal-input-icon" size={18} />
                                        </div>
                                    </div>
                                    <div className="stem-modal-field">
                                        <label className="stem-modal-label">
                                            {t.time}
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type="time"
                                                name="preferredTime"
                                                value={formData.preferredTime}
                                                onChange={handleChange}
                                                className="stem-modal-input stem-modal-input-with-icon"
                                            />
                                            <Clock className="stem-modal-input-icon" size={18} />
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="stem-modal-field">
                                    <label className="stem-modal-label">
                                        {t.message}
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder={t.messagePlaceholder}
                                        rows={4}
                                        className="stem-modal-textarea"
                                    />
                                </div>

                                {/* Error Message */}
                                {submitStatus === 'error' && (
                                    <div className="stem-modal-error">
                                        {t.errorMessage}
                                    </div>
                                )}

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
