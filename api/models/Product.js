const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    productName: { type: String, required: true, unique: true },
    productImage: { type: String, required: true, unique: true },
    description: { type: String, required: true, },
    productImageUrls: { type: Array, required: true },
    collection: { type: Array, required: true },
    sizes: { type: Array, required: true},
    colors: { type: Array, required: true },
    price: { type: Number, required: true },
    
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);