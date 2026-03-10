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
        date: '23 February 2025',
        title: 'Jab Hum Pehli Dafa Mile',
        description: 'Hamari khoobsurat kahani ki ibtida. Sab kuch yahan se shuru hua, aur tab se zindagi kitni haseen ho gayi hai.',
        image: 'https://images.unsplash.com/photo-1518199266791-5375a83164ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 2,
        date: 'March 2025',
        title: 'Pyari Baatein',
        description: 'Sirf tum se baat karne ke liye der tak jagna. Har message ek nayi muskurahat le kar aata tha.',
        image: 'https://images.unsplash.com/photo-1520690214124-2405c5217036?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 3,
        date: 'April 2025',
        title: 'Snapchat Streak',
        description: 'Humne apni streak shuru ki aur usay har roz barkarar rakha. Ye hamare rozana juday rehne ki ek pyari si nishani ban gayi.',
    },
    {
        id: 4,
        date: 'May 2025',
        title: 'Khubsoorat Yaadein',
        description: 'Har mushkil waqt se guzar kar humne apne pyar aur aitbaar ko aur bhi mazboot banaya.',
        image: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
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
                            onClick={e => e.stopPropagation()}
                        >
                            <button className="modal-close" onClick={() => setSelectedEvent(null)}>
                                <X size={24} />
                            </button>
                            <h2 className="story-title text-gradient" style={{ fontSize: '2rem', marginBottom: '8px' }}>
                                {selectedEvent.title}
                            </h2>
                            <p className="timeline-date" style={{ marginBottom: '16px' }}>{selectedEvent.date}</p>
                            <p className="timeline-desc">{selectedEvent.description}</p>

                            {selectedEvent.image && (
                                <img src={selectedEvent.image} alt={selectedEvent.title} className="modal-image" />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <NextPageButton to="/challenges" label="Aazmaishein" />
        </motion.div>
    );
};

export default Story;
