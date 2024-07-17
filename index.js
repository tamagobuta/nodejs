const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/execute', async (req, res) => {
    const { source_code, language, input } = req.body;

    try {
        const response = await axios.post('http://api.paiza.io/runners/create', {
            source_code,
            language,
            input,
            api_key: 'guest'
        });

        const { id } = response.data;

        setTimeout(async () => {
            try {
                const result = await axios.get('http://api.paiza.io/runners/get_details', {
                    params: {
                        id,
                        api_key: 'guest'
                    }
                });

                res.json(result.data);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching the execution result.' });
            }
        }, 2000);

    } catch (error) {
        res.status(500).json({ error: 'Error executing the code.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
