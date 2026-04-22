const PriceHistory = require('../models/PriceHistory');

// Get price history for a product
const getProductHistory = async (req, res) => {
  try {
    const history = await PriceHistory.find({
      product: req.params.productId
    }).sort({ createdAt: -1 });

    if (!history.length) {
      return res.status(404).json({ message: 'No price history found' });
    }

    // Calculate overall stats
    const highestPrice = Math.max(...history.map(h => h.oldPrice));
    const lowestPrice = Math.min(...history.map(h => h.newPrice));
    const totalDrop = highestPrice - lowestPrice;
    const totalDropPercent = ((totalDrop / highestPrice) * 100).toFixed(2);

    res.status(200).json({
      success: true,
      count: history.length,
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