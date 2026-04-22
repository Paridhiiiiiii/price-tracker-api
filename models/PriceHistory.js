const mongoose = require('mongoose');

const priceHistorySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  oldPrice: {
    type: Number,
    required: true
  },
  newPrice: {
    type: Number,
    required: true
  },
  priceDrop: {
    type: Number,
    default: 0
  },
  percentageDrop: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('PriceHistory', priceHistorySchema);