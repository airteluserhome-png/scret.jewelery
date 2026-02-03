"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Mail, Instagram } from "lucide-react";

export default function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset after showing success
        setTimeout(() => {
            setFormData({ name: "", email: "", message: "" });
            setIsSubmitted(false);
            setIsOpen(false);
        }, 2000);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-[#FF0099] text-white flex items-center justify-center group touch-manipulation active:scale-95"
                style={{
                    border: "3px solid #000",
                    boxShadow: "4px 4px 0px #000",
                }}
                whileHover={{
                    y: -4,
                    boxShadow: "6px 6px 0px #000"
                }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: isOpen ? 90 : 0 }}
                aria-label={isOpen ? "Close contact" : "Contact us"}
            >
                {isOpen ? (
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                )}
            </motion.button>

            {/* Contact Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed left-4 right-4 bottom-20 md:left-6 md:right-auto md:bottom-24 z-50 md:w-80 bg-white max-h-[80vh] overflow-y-auto"
                        style={{
                            border: "3px solid #000",
                            boxShadow: "8px 8px 0px #FF0099",
                        }}
                    >
                        {/* Header */}
                        <div className="p-5 border-b-3 border-black bg-black text-white">
                            <h3 className="font-brutalist text-2xl uppercase tracking-wider">
                                Get in Touch
                            </h3>
                            <p className="text-xs font-bold uppercase tracking-widest text-white/60 mt-1">
                                We respond within 24 hours
                            </p>
                        </div>

                        {isSubmitted ? (
                            /* Success Message */
                            <div className="p-8 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-16 h-16 mx-auto bg-[#FF0099] flex items-center justify-center mb-4"
                                >
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </motion.div>
                                <p className="font-brutalist text-xl uppercase">Message Sent!</p>
                                <p className="text-sm text-black/50 mt-2">We&apos;ll be in touch soon.</p>
                            </div>
                        ) : (
                            /* Contact Form */
                            <form onSubmit={handleSubmit} className="p-5 space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="YOUR NAME"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-white font-bold text-sm uppercase tracking-widest placeholder-black/30 outline-none"
                                        style={{ border: "3px solid #000" }}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="YOUR EMAIL"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-white font-bold text-sm uppercase tracking-widest placeholder-black/30 outline-none"
                                        style={{ border: "3px solid #000" }}
                                    />
                                </div>
                                <div>
                                    <textarea
                                        placeholder="YOUR MESSAGE"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        rows={3}
                                        className="w-full px-4 py-3 bg-white font-bold text-sm uppercase tracking-widest placeholder-black/30 outline-none resize-none"
                                        style={{ border: "3px solid #000" }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-black text-white font-brutalist text-lg uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#FF0099] transition-colors disabled:opacity-50"
                                    style={{
                                        border: "3px solid #000",
                                        boxShadow: "4px 4px 0px #FF0099",
                                    }}
                                >
                                    {isSubmitting ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                        />
                                    ) : (
                                        <>
                                            Send <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                        {/* Quick Contact Options */}
                        <div className="p-4 border-t-3 border-black bg-black/5">
                            <p className="text-xs font-bold uppercase tracking-widest text-black/50 mb-3">
                                Or reach us directly
                            </p>
                            <div className="flex gap-2">
                                <a
                                    href="mailto:hello@secretly.jewelry"
                                    className="flex-1 py-2 bg-white flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                                    style={{ border: "2px solid #000" }}
                                >
                                    <Mail className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://instagram.com/skhh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-2 bg-white flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider hover:bg-[#FF0099] hover:text-white transition-colors"
                                    style={{ border: "2px solid #000" }}
                                >
                                    <Instagram className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
