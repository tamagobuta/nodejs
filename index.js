const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/runners/create', async (req, res) => {
    try {
        const response = await axios.post('http://api.paiza.io/runners/create', req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/runners/get_details', async (req, res) => {
    try {
        const response = await axios.get('http://api.paiza.io/runners/get_details', {
            params: req.query
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
