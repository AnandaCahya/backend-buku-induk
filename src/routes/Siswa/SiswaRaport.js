const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.get('/image-raport/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { semester = 1 } = req.query;

    const url = `http://localhost:8080/view-image-raport/${id}?semester=${semester}`;
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setViewport({
      width: 780,
      height: 800,
      deviceScaleFactor: 2,
    });

    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    const imageBuffer = await page.screenshot({
      type: 'png',
      fullPage: true,
    });

    await browser.close();
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'inline');

    res.send(imageBuffer);
  } catch (err) {
    console.error('Terjadi kesalahan:', err);
    res.status(500).send('Terjadi kesalahan saat ekspor gambar');
  }
});

module.exports = router;
