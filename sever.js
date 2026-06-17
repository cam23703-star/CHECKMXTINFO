const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/ff/:uid', async (req, res) => {
    const uid = req.params.uid;
    if (!uid || isNaN(uid)) {
        return res.status(400).json({ error: 'UID phải là số' });
    }
    try {
        const response = await axios.get(`https://checkff.net/api/player/${uid}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
                'Accept-Language': 'vi-VN,vi;q=0.9',
                'Referer': 'https://checkff.net/'
            },
            timeout: 10000
        });
        res.json(response.data);
    } catch (error) {
        console.error('[LỖI]', error.message);
        res.status(500).json({
            error: 'Không lấy được dữ liệu',
            detail: error.response?.data || error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Proxy FF chạy tại http://localhost:${PORT}`);
    console.log(`📁 Mở trình duyệt: http://localhost:${PORT}`);
});