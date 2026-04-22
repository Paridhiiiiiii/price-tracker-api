const Product = require('../models/Product');
const PriceHistory = require('../models/PriceHistory');

// Get all products for logged in user
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new product
const addProduct = async (req, res) => {
  try {
    const { name, url, currentPrice, targetPrice, category } = req.body;

    const product = await Product.create({
      user: req.user.id,
      name,
      url,
      currentPrice,
      targetPrice,
      category
    });

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Product removed'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product price + save history
const updatePrice = async (req, res) => {
  try {
    const { currentPrice } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const oldPrice = product.currentPrice;
    const priceDrop = oldPrice - currentPrice;
    const percentageDrop = ((priceDrop / oldPrice) * 100).toFixed(2);

    // Save price history
    await PriceHistory.create({
      product: product._id,
      user: req.user.id,
      oldPrice,
      newPrice: currentPrice,
      priceDrop,
      percentageDrop
    });

    // Update product price
    product.currentPrice = currentPrice;
    await product.save();

    res.status(200).json({
      success: true,
      data: product,
      priceChange: {
        oldPrice,
        newPrice: currentPrice,
        priceDrop,
        percentageDrop: `${percentageDrop}%`
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, addProduct, getProduct, deleteProduct, updatePrice };