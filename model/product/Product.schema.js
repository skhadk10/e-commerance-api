import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    status: {
      type: Boolean,
      require: true,
      default: true,
    },
    name: {
      type: String,
      require: true,
      default: "",
    },
    slug: {
      type: String,
      require: true,
      default: "",
    },
    price: {
      type: Number,
      require: true,
      default: "",
    },
    salePrice: {
      type: Number,
      require: true,
      default: "",
    },
    saleEndDatw: {
      type: Date,
    },
    qty: {
      type: Number,
      require: true,
      default: "",
    },
    description: {
      type: String,
      require: true,
      default: "",
    },
    thumbnail: {
      type: String,
    },
    images: {
      type: Array,
    },
    categories: {
      type: Array,
    },
  },
  {
    timestamp: true,
  }
);
const ProdSchema = mongoose.model("Product", ProductSchema);
export default ProdSchema;
