// models/product.js
import { Schema, model } from "mongoose";

const productSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  productName: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    default: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80"
  },

  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Product = model("Product", productSchema);

export default Product;
