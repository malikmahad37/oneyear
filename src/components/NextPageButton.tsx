import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface NextPageButtonProps {
    to?: string;
    label: string;
    onClick?: () => void;
}

const NextPageButton: React.FC<NextPageButtonProps> = ({ to, label, onClick }) => {
    const innerContent = (
        <>
            {label}
            <motion.span
                className="arrow-icon"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}
            >
                <ArrowRight size={20} />
            </motion.span>
        </>
    );

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', paddingBottom: '2rem' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                {to ? (
                    <Link to={to} className="glass-btn">
                        {innerContent}
                    </Link>
                ) : (
                    <button onClick={onClick} className="glass-btn" style={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                        {innerContent}
                    </button>
                )}
            </motion.div>
        </div>
    );
};

export default NextPageButton;
