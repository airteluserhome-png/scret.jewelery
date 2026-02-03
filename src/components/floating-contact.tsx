"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mail, Instagram, Bot, ChevronRight } from "lucide-react";

// FAQ data with questions and auto-responses
const FAQ_DATA = [
    {
        id: 1,
        question: "Where is my order?",
        answer: "Your order is being processed! Once shipped, you'll receive a tracking link via email within 24-48 hours. For urgent inquiries, DM us on Instagram @skhh."
    },
    {
        id: 2,
        question: "I want to reschedule my order",
        answer: "To reschedule your delivery, please email us at hello@secretly.jewelry with your order number and preferred delivery date. We'll get back to you within 24 hours."
    },
    {
        id: 3,
        question: "What's the return policy?",
        answer: "We offer 7-day returns for unworn items in original packaging. Contact us at hello@secretly.jewelry to initiate a return. Refunds are processed within 5-7 business days."
    },
    {
        id: 4,
        question: "Is my order authentic?",
        answer: "All our pieces are 5A Swiss quality replicas with full box and papers included. We guarantee premium craftsmanship and attention to detail."
    },
    {
        id: 5,
        question: "What payment methods do you accept?",
        answer: "We accept all major credit/debit cards through Stripe. Your payment is 100% secure and encrypted."
    },
    {
        id: 6,
        question: "Do you ship internationally?",
        answer: "Yes! We ship worldwide. International orders typically arrive within 7-14 business days. Shipping is discreet with no branding on packages."
    },
    {
        id: 7,
        question: "How do I track my order?",
        answer: "Once your order ships, you'll receive an email with tracking information. You can also DM us on Instagram @skhh with your order number for updates."
    },
    {
        id: 8,
        question: "Can I cancel my order?",
        answer: "Orders can be cancelled within 2 hours of placing. After that, please wait for delivery and initiate a return. Email hello@secretly.jewelry immediately to request cancellation."
    }
];

interface Message {
    id: number;
    type: "bot" | "user";
    text: string;
}

export default function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 0,
            type: "bot",
            text: "Hey! 👋 I'm here to help. Tap a question below or reach out directly!"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleQuestionClick = async (faq: typeof FAQ_DATA[0]) => {
        // Add user question
        const userMessage: Message = {
            id: messages.length,
            type: "user",
            text: faq.question
        };
        setMessages(prev => [...prev, userMessage]);

        // Show typing indicator
        setIsTyping(true);

        // Simulate bot typing delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Add bot response
        const botMessage: Message = {
            id: messages.length + 1,
            type: "bot",
            text: faq.answer
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
    };

    const resetChat = () => {
        setMessages([
            {
                id: 0,
                type: "bot",
                text: "Hey! 👋 I'm here to help. Tap a question below or reach out directly!"
            }
        ]);
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
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? (
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                )}
            </motion.button>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed left-4 right-4 bottom-20 md:left-6 md:right-auto md:bottom-24 z-50 md:w-96 bg-white max-h-[80vh] flex flex-col"
                        style={{
                            border: "3px solid #000",
                            boxShadow: "8px 8px 0px #FF0099",
                        }}
                    >
                        {/* Header */}
                        <div className="p-4 border-b-3 border-black bg-black text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#FF0099] flex items-center justify-center">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-brutalist text-lg uppercase tracking-wider">
                                        Secretly Bot
                                    </h3>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                                        Usually replies instantly
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={resetChat}
                                className="text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[300px] min-h-[200px] bg-gray-50">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-3 text-sm ${message.type === "user"
                                                ? "bg-[#FF0099] text-white"
                                                : "bg-white text-black border-2 border-black"
                                            }`}
                                    >
                                        {message.text}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white border-2 border-black px-4 py-3 flex gap-1">
                                        <motion.span
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            className="w-2 h-2 bg-black rounded-full"
                                        />
                                        <motion.span
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                            className="w-2 h-2 bg-black rounded-full"
                                        />
                                        <motion.span
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                            className="w-2 h-2 bg-black rounded-full"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Quick Questions */}
                        <div className="p-3 border-t-2 border-black bg-white max-h-[180px] overflow-y-auto">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-2">
                                Quick Questions
                            </p>
                            <div className="space-y-2">
                                {FAQ_DATA.map((faq) => (
                                    <button
                                        key={faq.id}
                                        onClick={() => handleQuestionClick(faq)}
                                        disabled={isTyping}
                                        className="w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider bg-gray-100 hover:bg-[#FF0099] hover:text-white transition-colors flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
                                        style={{ border: "2px solid #000" }}
                                    >
                                        <span>{faq.question}</span>
                                        <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Direct Contact Options */}
                        <div className="p-3 border-t-2 border-black bg-black/5">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-2">
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
