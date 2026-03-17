import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const router = express.Router();

router.get('/scrape/:slug', async (req, res) => {
  const { slug } = req.params;
  const url = `https://www.takeuforward.org/data-structure/${slug}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const articleContent = $('.inside-article').html();
    res.json({ articleContent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape content' });
  }
});

export default router;
