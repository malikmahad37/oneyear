import React, { useEffect, useRef } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { motion } from 'framer-motion';
import './AudioPlayer.css';

const AudioPlayer: React.FC = () => {
    const { isMusicPlaying, toggleMusic } = useMemory();
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            if (isMusicPlaying) {
                audioRef.current.play().catch(e => console.warn("Autoplay blocked:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isMusicPlaying]);

    return (
        <div className="audio-player-wrapper">
            <audio
                ref={audioRef}
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                loop
            />

            <button
                onClick={toggleMusic}
                className="glass-btn audio-toggle-btn"
                aria-label="Toggle Background Music"
            >
                {isMusicPlaying ? (
                    <div className="audio-icon-wrapper">
                        <Pause size={24} />
                        <motion.div
                            className="music-note"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                        >
                            <Music size={12} />
                        </motion.div>
                    </div>
                ) : (
                    <Play size={24} />
                )}
            </button>
        </div>
    );
};

export default AudioPlayer;
