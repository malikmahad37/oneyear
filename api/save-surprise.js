import { createClient } from 'redis';

const redis = createClient({
    url: 'redis://default:UpH8iGFjU39tXCvKQWIbPmUsWPjEPtCu@redis-17387.c240.us-east-1-3.ec2.cloud.redislabs.com:17387'
});

// Avoid reconnecting on every API call in serverless environment
redis.on('error', (err) => console.log('Redis Client Error', err));
const connectDb = async () => {
    if (!redis.isReady && !redis.isOpen) {
        await redis.connect();
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        await connectDb();
        const { image, date, caption } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'Image data is required' });
        }

        const newEntry = {
            id: `surprise-${Date.now()}`,
            url: image,
            date: date || new Date().toISOString(),
            caption: caption || 'Gotcha!',
            type: 'photo'
        };

        // Needs to be stringified for standard redis lists
        await redis.lPush('surprises_list_final', JSON.stringify(newEntry));

        return res.status(200).json({ success: true, entry: newEntry });
    } catch (error) {
        console.error('Error saving to Redis:', error);
        return res.status(500).json({ error: error.message || 'Failed to save surprise to database' });
    }
}
