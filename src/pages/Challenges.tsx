import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Shield, AlertCircle, HeartHandshake } from 'lucide-react';
import NextPageButton from '../components/NextPageButton';
import './Challenges.css';

const Challenges: React.FC = () => {
    const challengesList = [
        {
            icon: <CloudRain size={32} />,
            title: 'Mushkil Waqt aur Galatfehmiyan',
            desc: 'Har sacche rishte ki tarha, hamare bhi kuch aise lamhat aaye jab hum pareshan hue. Kuch din bohat bhari the aur kuch baatein samjhana mushkil tha. Lekin har toofan ne humein ek doosre ke aur kareeb kar diya.'
        },
        {
            icon: <AlertCircle size={32} />,
            title: 'Dabao ke wo lamhat',
            desc: 'Bahar ki pareshaniyon aur zaati maslon ne kabhi kabhi humein alag karne ki koshish ki. Waqt ki kami, stress aur logon ki baaton ne thakaya, par humne haar manne ke bajaye ek doosre ka hath aur mazbooti se thaam liya.'
        },
        {
            icon: <Shield size={32} />,
            title: 'Har Haal Mein Wafa',
            desc: 'Halaat chahe kitne hi kharab kyun na hue, ek baat hamesha kaim rahi: humne kabhi ek doosre ka sath nahi chora. Hamari wafa aur aitbaar har mushkil se zyada taqatwar sabit hue.'
        }
    ];

    return (
        <motion.div
            className="challenges-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="challenges-header">
                <h1 className="challenges-title text-gradient">Aazmaishein aur Taqat</h1>
                <p className="challenges-subtitle">
                    Ek sachi aur khoobsurat mohabbat ki kahani wo nahi jismein masle na hon, balke wo hai jahan do log
                    ye faisla karein ke unki mohabbat in sab pareshaniyon se bari hai.
                </p>
            </div>

            <div className="challenges-grid">
                {challengesList.map((ch, idx) => (
                    <motion.div
                        key={idx}
                        className="glass-card challenge-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                    >
                        <div className="challenge-icon-wrapper">
                            {ch.icon}
                        </div>
                        <div className="challenge-content">
                            <h3 className="challenge-card-title">{ch.title}</h3>
                            <p className="challenge-card-desc">{ch.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="strength-message"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <HeartHandshake size={48} className="text-primary mx-auto mb-6" />
                <h2 className="strength-message-title text-gradient">Sacha Pyar Hamesha Jeetta Hai</h2>
                <p className="strength-message-text">
                    "Humne andheron ka samna kiya, par hum kabhi akele nahi the. Har ansoo, har galatfehmi, aur har darr ke beech...
                    humne sirf ek doosre ko chuna. Aur yahi hamari sab se bari jeet hai."
                </p>
            </motion.div>

            <NextPageButton to="/supporters" label="Sath Khare Rehne Wale" />
        </motion.div>
    );
};

export default Challenges;
