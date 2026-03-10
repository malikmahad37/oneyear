import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import NextPageButton from '../components/NextPageButton';
import './Messages.css';

const Messages: React.FC = () => {
    const [activeMessage, setActiveMessage] = useState<string | null>(null);

    const loveNotes = [
        "Jab bhi tumhein dekhta hoon, mujhe tum se dobara mohabbat ho jati hai.",
        "Tum mera aaj ho, aur aanay wala har kal.",
        "Hazaron ki bheer mein bhi, meri nigahein hamesha sirf tumhein dhoondengi.",
        "Meri har muskurahat ki wajah banne ke liye tumhara shukriya.",
        "Halaat chahe kitne hi mushkil kyun na hon, hum mil kar unka samna karenge.",
        "Main tumhe lafzon se kahin zyada chahta hoon, jitna tumne socha bhi nahi hoga."
    ];

    return (
        <motion.div
            className="messages-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="messages-header">
                <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '16px' }}>
                    Pyar Bhare Pegham
                </h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                    Dil ko click kar ke mohabbat ke chuppe hue pegham parhein.
                </p>
            </div>

            <div className="heart-wall">
                {loveNotes.map((note, idx) => (
                    <motion.button
                        key={idx}
                        className="interactive-heart"
                        onClick={() => setActiveMessage(note)}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        whileHover={{ scale: 1.2, rotate: Math.random() * 20 - 10 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Heart size={48} fill="url(#grad)" color="#ff4d6d" strokeWidth={1} />
                        <svg width="0" height="0">
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: 'var(--color-primary)', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: 'var(--color-purple)', stopOpacity: 1 }} />
                            </linearGradient>
                        </svg>
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {activeMessage && (
                    <motion.div
                        className="message-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveMessage(null)}
                    >
                        <motion.div
                            className="message-card"
                            initial={{ scale: 0.5, y: 50, opacity: 0, rotate: -5 }}
                            animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.5, y: 50, opacity: 0, rotate: 5 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 text-text hover:text-primary transition-colors"
                                onClick={() => setActiveMessage(null)}
                            >
                                <X size={24} />
                            </button>

                            <Heart size={40} className="text-primary mx-auto mb-6" fill="#ff4d6d" opacity={0.5} />

                            <p className="message-text">"{activeMessage}"</p>
                            <p className="message-author">- Mahad</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <NextPageButton to="/" label="Ghar (Home)" />
        </motion.div>
    );
};

export default Messages;
