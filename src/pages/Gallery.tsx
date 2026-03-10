import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, MessageCircle, X } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import type { MemoryItem } from '../context/MemoryContext';
import NextPageButton from '../components/NextPageButton';
import './Gallery.css';

const Gallery: React.FC = () => {
    const { memories } = useMemory();
    const [activeTab, setActiveTab] = useState<'photo' | 'chat' | 'voice' | 'video'>('photo');
    const [selectedMedia, setSelectedMedia] = useState<MemoryItem | null>(null);

    const tabs = [
        { id: 'photo', label: 'Tasveerein', icon: <Image size={18} /> },
        { id: 'chat', label: 'Chat ki Yaadein', icon: <MessageCircle size={18} /> },
    ];

    const filteredMemories = memories.filter(m => m.type === activeTab);

    return (
        <motion.div
            className="gallery-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="gallery-header">
                <h1 className="gallery-title text-gradient">Hamari Yaadein</h1>
                <p className="gallery-subtitle">Hamare khoobsurat safar ki ek digital diary.</p>
            </div>

            <div className="gallery-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`gallery-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id as any)}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            <motion.div layout className="gallery-grid">
                <AnimatePresence>
                    {filteredMemories.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="glass-card p-8 text-center"
                            style={{ gridColumn: '1 / -1' }}
                        >
                            <p>No memories of this type yet. Upload some to fill this space with love.</p>
                        </motion.div>
                    )}

                    {filteredMemories.map(memory => (
                        <motion.div
                            layout
                            key={memory.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className={`media-card ${activeTab === 'voice' ? 'audio-card glass-card' : ''}`}
                            onClick={() => (activeTab === 'photo' || activeTab === 'chat') && setSelectedMedia(memory)}
                        >
                            {(activeTab === 'photo' || activeTab === 'chat') && (
                                <>
                                    <img src={memory.url} alt={memory.caption} className={`media-image ${activeTab === 'chat' ? 'chat-image' : ''}`} />
                                    {(memory.caption || memory.date) && (
                                        <div className="media-overlay">
                                            {memory.caption && <div className="media-title">{memory.caption}</div>}
                                            {memory.date && <div className="media-date">{memory.date}</div>}
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Fullscreen Modal for Photos & Chats */}
            <AnimatePresence>
                {selectedMedia && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMedia(null)}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={() => setSelectedMedia(null)}
                            style={{ background: 'transparent', boxShadow: 'none', cursor: 'pointer' }}
                        >
                            <button className="modal-close" onClick={(e) => { e.stopPropagation(); setSelectedMedia(null); }}>
                                <X size={32} />
                            </button>
                            <img src={selectedMedia.url} alt="Fullscreen Memory" className="modal-image" onClick={(e) => e.stopPropagation()} />
                            {(selectedMedia.caption || selectedMedia.date) && (
                                <div className="text-white text-center mt-6" onClick={(e) => e.stopPropagation()}>
                                    <h2 className="text-2xl font-bold font-outfit">{selectedMedia.caption}</h2>
                                    <p className="opacity-80 mt-2">{selectedMedia.date}</p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {activeTab === 'photo' ? (
                <NextPageButton
                    label="Chat ki Yaadein"
                    onClick={() => {
                        setActiveTab('chat');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                />
            ) : (
                <NextPageButton to="/dates" label="Khaas Tareekhein" />
            )}
        </motion.div>
    );
};

export default Gallery;
