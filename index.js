const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY || 'guest'; // 環境変数からAPIキーを取得

// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

// ランナー作成エンドポイント
app.post('/runners/create', async (req, res) => {
    try {
        const response = await axios.post('http://api.paiza.io/runners/create', {
            ...req.body,
            api_key: API_KEY // APIキーを追加
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error creating runner:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
});

// ランナー詳細取得エンドポイント
app.get('/runners/get_details', async (req, res) => {
    try {
        const response = await axios.get('http://api.paiza.io/runners/get_details', {
            params: {
                ...req.query,
                api_key: API_KEY // APIキーを追加
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error getting runner details:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
