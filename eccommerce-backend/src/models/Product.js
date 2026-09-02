import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    discountPrice: {
  type: Number,
  min: [0, "Discount price cannot be negative"],
  default: 0,
  validate: {
    validator: function validateDiscount(value) {
      // 1. Agar value null, undefined ya 0 hai toh valid hai
      if (value === null || value === undefined || value === 0) {
        return true;
      }

      // 2. Mongoose Document vs Query Context Handling
      const price = this instanceof Object && 'price' in this 
        ? this.price 
        : this?.getUpdate?.()?.price || this?.getUpdate?.()?.$set?.price;

      // 3. Agar price available nahi (e.g. update query context missing), fail safe exit
      if (price === undefined) return true;

      return value <= price;
    },
    message: "Discount price ({VALUE}) cannot be greater than regular price",
  },
},
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text", brand: "text" });

const Product = mongoose.model("Product", productSchema);
export default Product;
