import { useState } from 'react';
import axios from 'axios';

interface SharePanelProps {
    documentId: string;
    sharedWith: { email: string; role: string }[];
    onSharedWithChange: (updatedSharedWith: { email: string; role: string }[]) => void;
}

const SharePanel: React.FC<SharePanelProps> = ({ documentId, sharedWith, onSharedWithChange }) => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('viewer');
    const [loading, setLoading] = useState(false);

    const handleShare = async () => {
        if (!email) {
            alert('Please enter an email');
            return;
        }
        setLoading(true);
        try {
            const res = await axios.put(`/api/documents/${documentId}/share`, { email, role });
            onSharedWithChange(res.data.sharedWith);
            setEmail('');
        } catch (err: any) {
            alert(err.response?.data?.error || 'Failed to share document');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border p-4 mt-6">
            <h3 className="font-semibold mb-2">Share Document</h3>
            <input
                type="email"
                placeholder="User email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 mr-2"
            />
            <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 mr-2">
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
            </select>
            <button disabled={loading} onClick={handleShare} className="btn btn-primary">
                {loading ? 'Sharing...' : 'Share'}
            </button>

            <div className="mt-4">
                <h4 className="font-semibold">Shared With:</h4>
                <ul>
                    {sharedWith.map(({ email, role }) => (
                        <li key={email}>
                            {email} - {role}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SharePanel;
