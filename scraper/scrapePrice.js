const axios = require('axios');
const cheerio = require('cheerio');

async function scrapePrice(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });
    const $ = cheerio.load(data);

    if (url.includes('amazon')) {
      const priceText = $('.a-price-whole').first().text().replace(',', '').trim();
      return parseFloat(priceText) || null;
    }

    if (url.includes('flipkart')) {
      const priceText = $('._30jeq3').first().text().replace('Rs.','').replace(',','').trim();
      return parseFloat(priceText) || null;
    }

    return null;
  } catch (err) {
    console.error('Scrape failed for:', url, err.message);
    return null;
  }
}

module.exports = { scrapePrice };