const cron = require('node-cron');
const Product = require('../models/Product');
const PriceHistory = require('../models/PriceHistory');
const Alert = require('../models/Alert');
const User = require('../models/User');
const { scrapePrice } = require('../scraper/scrapePrice');
const { sendAlertEmail } = require('../config/mailer');

cron.schedule('0 * * * *', async () => {
  console.log('[Cron] Checking prices at', new Date().toISOString());

  const products = await Product.find();

  for (const product of products) {
    if (!product.url) continue;

    const newPrice = await scrapePrice(product.url);
    if (!newPrice || newPrice === product.currentPrice) continue;

    const oldPrice = product.currentPrice;
    const dropPercent = (((oldPrice - newPrice) / oldPrice) * 100).toFixed(2);

    product.currentPrice = newPrice;
    await product.save();

    await PriceHistory.create({
      product: product._id,
      price: newPrice,
      previousPrice: oldPrice,
      dropPercent
    });

    const alerts = await Alert.find({
      product: product._id,
      targetPrice: { $gte: newPrice }
    }).populate('user');

    for (const alert of alerts) {
      await sendAlertEmail(
        alert.user.email,
        product.name,
        alert.targetPrice,
        newPrice,
        product.url
      );
      console.log(`[Alert] Sent email to ${alert.user.email} for ${product.name}`);
    }
  }
});