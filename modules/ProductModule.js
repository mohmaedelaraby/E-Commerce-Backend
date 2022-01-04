const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    titel: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: Array },
    size: { type: String },
    color: { type: String},
    price: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);