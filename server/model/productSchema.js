const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true

  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  offer: {
    type: Number,
  },
  productPictures: [
    {
      img: { type: String }
    }
  ],
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      review: String
    }
  ],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updatedAt: Date,

}, { timestamps: true });


productSchema.index({ name: 'text' })
module.exports = mongoose.model('Product', productSchema);
