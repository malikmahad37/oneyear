import { createClient } from 'redis';

const redis = createClient({
    url: 'redis://default:UpH8iGFjU39tXCvKQWIbPmUsWPjEPtCu@redis-17387.c240.us-east-1-3.ec2.cloud.redislabs.com:17387'
});

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
    0
    try {
        await connectDb();
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        const rawList = await redis.lRange('surprises_list_final', 0, -1) || [];
        const itemStringToDelete = rawList.find(item => {
            try {
                return JSON.parse(item).id === id;
            } catch (e) {
                return false;
            }
        });

        if (itemStringToDelete) {
            await redis.lRem('surprises_list_final', 1, itemStringToDelete);
            return res.status(200).json({ success: true });
        }

        return res.status(404).json({ error: 'Surprise not found' });
    } catch (error) {
        console.error('Error deleting from Redis:', error);
        return res.status(500).json({ error: error.message || 'Failed to delete' });
    }
}
