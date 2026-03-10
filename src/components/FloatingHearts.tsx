import React, { useMemo } from 'react';
import { Heart } from 'lucide-react';
import './AudioPlayer.css';


const FloatingHearts: React.FC = () => {
    const hearts = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}vw`,
            size: Math.random() * 15 + 10,
            duration: `${Math.random() * 10 + 10}s`, // Slower animation
            delay: `${Math.random() * 10}s`,
            drift: `${Math.random() * 10 - 5}vw`
        }));
    }, []);

    return (
        <div className="heart-bg" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
            {hearts.map(heart => (
                <div
                    key={heart.id}
                    className="heart-container"
                    style={{
                        '--left': heart.left,
                        '--duration': heart.duration,
                        '--delay': heart.delay,
                        '--drift': heart.drift
                    } as React.CSSProperties}
                >
                    <Heart size={heart.size} fill="#ff4d6d" />
                </div>
            ))}
        </div>
    );
};

export default FloatingHearts;
