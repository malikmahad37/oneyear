export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { kv } = require('@vercel/kv');

        // Fetch from Vercel KV Redis database
        let surprises = await kv.get('surprises') || [];

        return res.status(200).json({ success: true, surprises });
    } catch (error) {
        console.error('Error fetching from Redis:', error);
        return res.status(500).json({ error: 'Failed to fetch surprises from database' });
    }
}
