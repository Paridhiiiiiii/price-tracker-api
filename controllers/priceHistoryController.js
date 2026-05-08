const PriceHistory = require('../models/PriceHistory');

// Get price history for a product (with pagination)
const getProductHistory = async (req, res) => {
  try {
    const { page = 1, limit = 20, sort = 'desc' } = req.query;

    const history = await PriceHistory.find({
      product: req.params.productId
    })
      .sort({ createdAt: sort === 'desc' ? -1 : 1 })
      .skip((page - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (!history.length) {
      return res.status(404).json({ message: 'No price history found' });
    }

    const total = await PriceHistory.countDocuments({ product: req.params.productId });

    // Calculate overall stats
    const highestPrice = Math.max(...history.map(h => h.oldPrice));
    const lowestPrice = Math.min(...history.map(h => h.newPrice));
    const totalDrop = highestPrice - lowestPrice;
    const totalDropPercent = ((totalDrop / highestPrice) * 100).toFixed(2);

    res.status(200).json({
      success: true,
      count: history.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      stats: {
        highestPrice,
        lowestPrice,
        totalDrop,
        totalDropPercent: `${totalDropPercent}%`
      },
      data: history
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all price history for logged in user
const getAllHistory = async (req, res) => {
  try {
    const history = await PriceHistory.find({ user: req.user.id })
      .populate('product', 'name url category')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProductHistory, getAllHistory };