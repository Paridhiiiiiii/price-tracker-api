const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  currentPrice: {
    type: Number,
    required: true
  },
  targetPrice: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    default: 'general'
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);