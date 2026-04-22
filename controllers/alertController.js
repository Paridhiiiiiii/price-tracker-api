const Alert = require('../models/Alert');
const Product = require('../models/Product');

// Set price alert for a product
const setAlert = async (req, res) => {
  try {
    const { productId, targetPrice } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if price already below target
    const isTriggered = product.currentPrice <= targetPrice;
    const message = isTriggered
      ? `🎉 Price alert! ${product.name} is already at ₹${product.currentPrice}, below your target of ₹${targetPrice}`
      : `Alert set! We'll notify you when ${product.name} drops below ₹${targetPrice}`;

    const alert = await Alert.create({
      user: req.user.id,
      product: productId,
      targetPrice,
      currentPrice: product.currentPrice,
      isTriggered,
      message
    });

    res.status(201).json({
      success: true,
      data: alert,
      message
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all alerts for logged in user
const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ user: req.user.id })
      .populate('product', 'name url currentPrice');

    res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check all alerts and trigger if price dropped
const checkAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({
      user: req.user.id,
      isTriggered: false
    }).populate('product');

    const triggered = [];

    for (let alert of alerts) {
      if (alert.product.currentPrice <= alert.targetPrice) {
        alert.isTriggered = true;
        alert.message = `🎉 Price dropped! ${alert.product.name} is now ₹${alert.product.currentPrice}, below your target of ₹${alert.targetPrice}`;
        await alert.save();
        triggered.push(alert);
      }
    }

    res.status(200).json({
      success: true,
      triggeredAlerts: triggered.length,
      data: triggered
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete alert
const deleteAlert = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    await alert.deleteOne();
    res.status(200).json({ success: true, message: 'Alert removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { setAlert, getAlerts, checkAlerts, deleteAlert };