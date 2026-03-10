import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { UploadCloud, CheckCircle } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { useNavigate } from 'react-router-dom';
import './Upload.css';

const Upload: React.FC = () => {
    const { addMemory } = useMemory();
    const navigate = useNavigate();

    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string>('');
    const [memoryType, setMemoryType] = useState<'photo' | 'chat' | 'voice' | 'video'>('photo');
    const [caption, setCaption] = useState('');
    const [date, setDate] = useState('');
    const [success, setSuccess] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const selected = acceptedFiles[0];
            setFile(selected);
            setFileUrl(URL.createObjectURL(selected)); // local preview & usage

            if (selected.type.startsWith('image/')) {
                setMemoryType('photo');
            } else if (selected.type.startsWith('audio/')) {
                setMemoryType('voice');
            } else if (selected.type.startsWith('video/')) {
                setMemoryType('video');
            }
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
            'audio/*': ['.mp3', '.wav', '.ogg'],
            'video/*': ['.mp4', '.webm']
        },
        maxFiles: 1
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fileUrl) return;

        const newMemory = {
            id: Date.now().toString(),
            type: memoryType,
            url: fileUrl,
            caption: caption,
            date: date || new Date().toISOString().split('T')[0]
        };

        addMemory(newMemory);
        setSuccess(true);

        setTimeout(() => {
            navigate('/gallery');
        }, 1500);
    };

    return (
        <motion.div
            className="upload-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="upload-header">
                <h1 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px' }}>
                    Yaadein Mehfooz Karein
                </h1>
                <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                    Hamari kahani ko mazeed khoobsurat banayein. Koi nayi tasveer, chat screenshot, voice note ya video upload karein.
                </p>
            </div>

            <div className="glass-card upload-card">
                {success ? (
                    <motion.div
                        className="flex flex-col items-center justify-center p-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <CheckCircle size={64} className="text-primary mb-4" />
                        <h2 className="text-2xl font-bold font-outfit text-secondary mb-2">Yaad Hamesha Ke Liye Mehfooz Ho Gayi!</h2>
                        <p>Gallery ki taraf le ja raha hai...</p>
                    </motion.div>
                ) : (
                    <>
                        <div {...getRootProps()} className={`dropzone-area ${isDragActive ? 'active' : ''}`}>
                            <input {...getInputProps()} />
                            <UploadCloud size={48} className="upload-icon" />
                            <h3 className="upload-title">
                                {isDragActive ? "File yahan chorein..." : "File ko yahan drag aur drop karein"}
                            </h3>
                            <p className="upload-desc">
                                Ya browse karne ke liye click karein. Images, audio, aur video formats support karta hai.
                            </p>
                        </div>

                        {file && (
                            <form onSubmit={handleSubmit} className="upload-form">
                                <div className="preview-area">
                                    {memoryType === 'photo' || memoryType === 'chat' ? (
                                        <img src={fileUrl} alt="Preview" className="preview-image inline-block" />
                                    ) : (
                                        <div className="preview-text">Selected File: {file.name}</div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <select
                                        className="form-select"
                                        value={memoryType}
                                        onChange={e => setMemoryType(e.target.value as any)}
                                    >
                                        <option value="photo">Photo / Picture</option>
                                        <option value="chat">Chat Screenshot</option>
                                        <option value="voice">Voice Note</option>
                                        <option value="video">Video Memory</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Caption / Description</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="E.g., Our first trip together..."
                                        value={caption}
                                        onChange={e => setCaption(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Date</label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                    />
                                </div>

                                <button type="submit" className="glass-btn submit-btn">
                                    <UploadCloud size={20} /> Upload to Our Story
                                </button>
                            </form>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default Upload;
