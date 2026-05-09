const axios = require('axios');

async function scrapePrice(url) {
  try {
    console.log('[Scraper] Fetching:', url);
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0'
      },
      timeout: 10000
    });

    console.log('[Scraper] Page fetched successfully, sending to Gemini...');

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Extract only the current selling price as a plain number from this HTML.
                   Return only the number, no currency symbol, no commas, nothing else.
                   Example: 29999
                   
                   HTML:
                   ${data.slice(0, 5000)}`
          }]
        }]
      }
    );

    console.log('[Gemini] Response:', response.data.candidates[0].content.parts[0].text);

    const price = parseFloat(
      response.data.candidates[0].content.parts[0].text.trim()
    );
    return isNaN(price) ? null : price;

  } catch (err) {
    console.error('[Scraper] Failed for:', url);
    console.error('[Scraper] Error:', err.response?.status, err.response?.data || err.message);
    return null;
  }
}

module.exports = { scrapePrice };