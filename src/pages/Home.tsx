import React from 'react';
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <div className="glass-card hero-card">
                    <div className="hero-gradient-bar"></div>

                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="hero-image-container"
                    >
                        <img
                            src="/memories/hero_couple.jpg"
                            alt="Mahad & Alishba"
                            className="hero-couple-img"
                        />
                    </motion.div>

                    <h1 className="hero-title text-gradient">
                        Mahad ❤️ Alishba
                    </h1>

                    <p className="hero-subtitle">
                        "Hamari payari si kahani... Yaadon, Mushkilon aur Hamesha ke Sath ka safar"
                    </p>

                    <Link to="/story" className="glass-btn start-btn">
                        Safar Shuru Karein
                        <motion.span
                            className="arrow-icon"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            →
                        </motion.span>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Home;
