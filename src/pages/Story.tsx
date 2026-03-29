import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import NextPageButton from '../components/NextPageButton';
import './Story.css';

interface TimelineEvent {
    id: number;
    date: string;
    title: string;
    description: string;
    image?: string;
}

const events: TimelineEvent[] = [
    {
        id: 1,
        date: '23 March 2025',
        title: 'Jab Hum Pehli Dafa Mile',
        description: 'Hamari khoobsurat kahani ki ibtida. Sab kuch yahan se shuru hua, aur tab se zindagi kitni haseen ho gayi hai.',
        image: 'https://images.unsplash.com/photo-1518199266791-5375a83164ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 2,
        date: '25 March 2026',
        title: 'Pehli Face-to-Face Mulaqat',
        description: 'Wo khoobsurat din jab hum sach mein pehli baar mile aur maine apne hathon se tumhe brownie khilai. Yeh din hamesha ke liye meri aakhon mein qaid ho gaya.',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
];

const Story: React.FC = () => {
    const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

    return (
        <motion.div
            className="story-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="story-header">
                <h1 className="story-title text-gradient">Hamari Kahani (Timeline)</h1>
                <p className="story-subtitle">Mahad aur Alishba ke khoobsurat lamhat ka safar</p>
            </div>

            <div className="timeline">
                {events.map((evt, index) => (
                    <motion.div
                        key={evt.id}
                        className="timeline-item"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className="timeline-dot"></div>
                        <div className="glass-card timeline-content" onClick={() => setSelectedEvent(evt)}>
                            <div className="timeline-date">{evt.date}</div>
                            <h3 className="timeline-card-title">{evt.title}</h3>
                            <p className="timeline-desc">{evt.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedEvent(null)}
                    >
                        <motion.div
                            className="glass-card modal-content"
                            initial={{ scale: 0.8, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.8, y: 50, opacity: 0 }}
                            onClick={() => setSelectedEvent(null)}
                            style={{ cursor: 'pointer' }}
                        >
                            <button className="modal-close" onClick={(e) => { e.stopPropagation(); setSelectedEvent(null); }}>
                                <X size={24} />
                            </button>
                            <div onClick={(e) => e.stopPropagation()} style={{ cursor: 'default' }}>
                                <h2 className="story-title text-gradient" style={{ fontSize: '2rem', marginBottom: '8px' }}>
                                    {selectedEvent.title}
                                </h2>
                                <p className="timeline-date" style={{ marginBottom: '16px' }}>{selectedEvent.date}</p>
                                <p className="timeline-desc">{selectedEvent.description}</p>

                                {selectedEvent.image && (
                                    <img src={selectedEvent.image} alt={selectedEvent.title} className="modal-image" />
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <NextPageButton to="/challenges" label="Aazmaishein" />
        </motion.div>
    );
};

export default Story;
