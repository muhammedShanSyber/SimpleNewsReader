const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;
const newsApi = process.env.NEWSAPI_KEY;

if (!newsApi) {
  console.error("No API key found. Please set the NEWSAPI_KEY environment variable.");
  process.exit(1);
}

console.log(`Fetching news with API Key: ${newsApi}`);

app.use(cors()); 
app.use(express.json());

app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApi}`);
    console.log(response.data.articles);
    res.json(response.data.articles);
  } catch (error) {
    console.error('Error fetching news:', error.message); 
    res.status(500).json({ error: 'Error fetching news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
