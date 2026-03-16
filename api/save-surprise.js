export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method naturally not allowed' });
    }

    try {
        const { kv } = require('@vercel/kv');
        const { image, date, caption } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'Image data is required' });
        }

        const id = `surprise-${Date.now()}`;
        const newEntry = {
            id,
            url: image,
            date: date || new Date().toISOString(),
            caption: caption || 'Gotcha!',
            type: 'photo'
        };

        // Save to Vercel KV Redis database
        // Fetch the list of existing surprises or start an empty array
        let surprises = await kv.get('surprises') || [];
        surprises.unshift(newEntry);
        await kv.set('surprises', surprises);

        return res.status(200).json({ success: true, entry: newEntry });
    } catch (error) {
        console.error('Error saving to Redis:', error);
        return res.status(500).json({ error: 'Failed to save surprise to database' });
    }
}
