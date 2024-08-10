const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your API key

app.use(express.json());

app.post('/get-directions', async (req, res) => {
    const { origin, destination } = req.body;
    
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
            params: {
                origin: `${origin.lat},${origin.lng}`,
                destination: `${destination.lat},${destination.lng}`,
                key: apiKey
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching directions:', error);
        res.status(500).send('Error fetching directions');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
