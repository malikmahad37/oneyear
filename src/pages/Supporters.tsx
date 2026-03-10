import React from 'react';
import { motion } from 'framer-motion';
import { Users2 } from 'lucide-react';
import NextPageButton from '../components/NextPageButton';
import './Supporters.css';

const Supporters: React.FC = () => {
    const supportersList = [
        {
            name: "Ayesha (Alishba ki Behen)",
            role: 'Family aur Rehnuma',
            initial: 'A',
            desc: "Ayesha sirf ek behen nahi, balke ek aisi dua hai jo hamare haq mein qubool hui. Jab halaat mushkil the aur raste dhoondle lag rahe the, tab Ayesha ne hamari kahani mein qadam rakha aur hamari sab se bari taqat bani. Unka samjhana, unki naseehatein aur har qadam par unka hamara sath dena humein na-ummeed nahi hone deta tha. Yeh unhi ka hosla aur mohabbat thi jisne humein aur bhi mazbooti se joray rakha. Sachi mohabbat ko hamesha uske chahne wale mil hi jate hain, aur Ayesha hamare liye us farishtay ki tarha aayi jab humein sab se zyada zaroorat thi. Hum aaj jo bhi hain, unki duaaon aur unke diye gaye hoslay ka isme bohat bara hissa hai."
        }
    ];

    return (
        <motion.div
            className="supporters-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="supporters-header">
                <Users2 size={56} className="text-primary mx-auto mb-4" />
                <h1 className="supporters-title text-gradient">Hamare Sath Khare Rehne Wale</h1>
                <p className="supporters-subtitle">
                    Har azeem mohabbat ki kahani mein kuch farishtay zaroor hote hain. Yeh wo khoobsurat log hain jinhone hamara sath diya aur is safar mein hamare qadam majboot kiye.
                </p>
            </div>

            <div className="supporters-grid">
                {supportersList.map((sup, idx) => (
                    <motion.div
                        key={idx}
                        className="glass-card supporter-card"
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="supporter-decorative-bg"></div>
                        <div className="supporter-avatar">
                            {sup.initial}
                        </div>

                        <div className="supporter-content">
                            <h3 className="supporter-name">{sup.name}</h3>
                            <div className="supporter-role">{sup.role}</div>
                            <p className="supporter-desc">"{sup.desc}"</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <NextPageButton to="/gallery" label="Yaadein" />
        </motion.div>
    );
};

export default Supporters;
