import React, { useState } from 'react';
import { Lock, Image as ImageIcon, Trash2 } from 'lucide-react';
import './Admin.css';

interface SurpriseEntry {
    id: string;
    url: string;
    date: string;
    caption: string;
    type: string;
}

const Admin: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [surprises, setSurprises] = useState<SurpriseEntry[]>([]);
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // simple local hardcoded password protection (should ideally be env var)
        if (password === 'mahad123') {
            setIsAuthenticated(true);
            setError('');
            fetchSurprises();
        } else {
            setError('Incorrect Password');
        }
    };

    const fetchSurprises = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/get-surprises');
            const data = await response.json();
            if (data.success) {
                setSurprises(data.surprises);
            }
        } catch (err) {
            console.error('Error fetching surprises', err);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this photo forever?")) return;
        try {
            const response = await fetch('/api/delete-surprise', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            const data = await response.json();
            if (data.success) {
                setSurprises(prev => prev.filter(s => s.id !== id));
            } else {
                alert("Failed to delete capture.");
            }
        } catch (err) {
            console.error("Error deleting:", err);
            alert("Error deleting photo. Check console.");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login-container">
                <div className="admin-card text-center fade-in">
                    <Lock size={48} className="text-secondary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold font-outfit mb-6">Secret Admin Panel</h2>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type="submit" className="glass-btn primary-btn w-full">
                            Unlock Vault
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard fade-in">
            <div className="admin-header">
                <h1 className="text-gradient font-outfit text-3xl font-bold">Secret Surprises Vault</h1>
                <p className="text-gray-600 mt-2">All reaction photos captured from the Surprise page via Redis.</p>
                <button onClick={fetchSurprises} className="glass-btn primary-btn mt-4">Refresh Data</button>
            </div>

            <div className="admin-content mt-8">
                {loading ? (
                    <p className="text-center text-gray-500">Loading memories from database...</p>
                ) : surprises.length === 0 ? (
                    <div className="empty-state text-center py-12">
                        <ImageIcon size={64} className="text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl text-gray-400">No surprises captured yet.</h3>
                    </div>
                ) : (
                    <div className="surprises-grid">
                        {surprises.map((item) => (
                            <div key={item.id} className="surprise-card">
                                <div className="image-wrapper">
                                    <img src={item.url} alt="Selfie" />
                                    <button onClick={() => handleDelete(item.id)} className="delete-btn" aria-label="Delete">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                                <div className="surprise-info">
                                    <p className="date">{new Date(item.date).toLocaleString()}</p>
                                    <p className="caption">{item.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
