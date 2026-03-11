import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarHeart, Flame, Gift, Stars } from 'lucide-react';
import NextPageButton from '../components/NextPageButton';
import './Dates.css';

const Dates: React.FC = () => {
    const [daysSinceMet, setDaysSinceMet] = useState(0);

    useEffect(() => {
        setDaysSinceMet(365);
    }, []);

    const specialDates = [
        {
            id: 1,
            title: 'Pehli Mulaqat',
            value: 'Mar 23',
            desc: 'Wo khoobsurat din jab hamari nazrein mili.',
            icon: <CalendarHeart size={36} />
        },
        {
            id: 2,
            title: 'Sath Guzare Din',
            value: daysSinceMet.toString(),
            desc: 'Hamare safar ke shuru hone se ab tak.',
            icon: <Stars size={36} />
        },
        {
            id: 3,
            title: 'Snapchat Streak',
            value: '🔥',
            desc: 'Hamara na tootne wala roz ka raabta.',
            icon: <Flame size={36} />
        },
        {
            id: 4,
            title: 'Aane Wali Anniversaries',
            value: 'Hamesha',
            desc: 'Khoobsurat yadon ka silsila jo kabhi khatam nahi hoga.',
            icon: <Gift size={36} />
        }
    ];

    return (
        <motion.div
            className="dates-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="dates-header">
                <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '16px' }}>
                    Khaas Tareekhein
                </h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                    Tumhare sath har din khaas hai, lekin kuch lamhat hamesha ke liye naqsh ho jate hain.
                </p>
            </div>

            <div className="dates-grid">
                {specialDates.map((date, idx) => (
                    <motion.div
                        key={date.id}
                        className="glass-card date-card"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.15 }}
                    >
                        <div className="date-icon-container">
                            <div className="date-icon-inner">
                                {date.icon}
                            </div>
                        </div>

                        <h3 className="date-title">{date.title}</h3>

                        <motion.div
                            className="date-value"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: idx * 0.15 + 0.3 }}
                        >
                            {date.value}
                        </motion.div>

                        <p className="date-desc">{date.desc}</p>
                    </motion.div>
                ))}
            </div>

            <NextPageButton to="/messages" label="Pyar Bhare Pegham" />
        </motion.div>
    );
};

export default Dates;
