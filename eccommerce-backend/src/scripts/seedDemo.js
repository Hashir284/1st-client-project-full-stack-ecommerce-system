// Optional: seeds a handful of demo products, a demo customer, and demo
// orders so the dashboard has real data to display while you test the UI.
// Run with: npm run seed:demo
import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

const demoProducts = [
  { name: "Wireless Headphones", description: "Over-ear Bluetooth headphones with noise cancellation.", price: 129.99, discountPrice: 99.99, category: "Electronics", brand: "SoundWave", stock: 45, sku: "SKU-HEAD-001", images: [] },
  { name: "Running Shoes", description: "Lightweight running shoes with breathable mesh.", price: 89.99, discountPrice: 0, category: "Footwear", brand: "StrideMax", stock: 60, sku: "SKU-SHOE-002", images: [] },
  { name: "Stainless Steel Water Bottle", description: "Insulated 750ml bottle, keeps drinks cold for 24h.", price: 24.99, discountPrice: 19.99, category: "Accessories", brand: "HydroFlow", stock: 120, sku: "SKU-BOTL-003", images: [] },
  { name: "Mechanical Keyboard", description: "RGB backlit mechanical keyboard with hot-swappable switches.", price: 149.99, discountPrice: 129.99, category: "Electronics", brand: "KeyForge", stock: 8, sku: "SKU-KEYB-004", images: [] },
  { name: "Yoga Mat", description: "Non-slip 6mm eco-friendly yoga mat.", price: 39.99, discountPrice: 0, category: "Fitness", brand: "ZenFit", stock: 0, sku: "SKU-YOGA-005", images: [] },
  { name: "Leather Wallet", description: "Genuine leather bifold wallet with RFID protection.", price: 49.99, discountPrice: 34.99, category: "Accessories", brand: "Craftline", stock: 75, sku: "SKU-WALL-006", images: [] },
];

const run = async () => {
  await connectDB();

  let customer = await User.findOne({ email: "demo.customer@example.com" });
  if (!customer) {
    customer = await User.create({
      name: "Demo Customer",
      email: "demo.customer@example.com",
      password: "Customer@123",
      role: "user",
      isActive: true,
    });
    console.log("Created demo customer: demo.customer@example.com / Customer@123");
  }

  const createdProducts = [];
  for (const p of demoProducts) {
    let product = await Product.findOne({ sku: p.sku });
    if (!product) {
      product = await Product.create(p);
      console.log(`Created product: ${product.name}`);
    }
    createdProducts.push(product);
  }

  const existingOrders = await Order.countDocuments();
  if (existingOrders === 0) {
    const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Delivered", "Cancelled"];
    const paymentStatuses = ["Paid", "Paid", "Paid", "Paid", "Pending", "Failed"];

    for (let i = 0; i < 6; i += 1) {
      const item1 = createdProducts[i % createdProducts.length];
      const item2 = createdProducts[(i + 2) % createdProducts.length];
      const quantity1 = 1 + (i % 3);
      const quantity2 = 1 + ((i + 1) % 2);
      const price1 = item1.discountPrice || item1.price;
      const price2 = item2.discountPrice || item2.price;
      const subtotal = price1 * quantity1 + price2 * quantity2;
      const shipping = 5.99;
      const discount = i % 2 === 0 ? 5 : 0;
      const total = Math.max(subtotal + shipping - discount, 0);

      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - i * 12);

      await Order.create({
        user: customer._id,
        items: [
          { product: item1._id, name: item1.name, price: price1, quantity: quantity1, image: "" },
          { product: item2._id, name: item2.name, price: price2, quantity: quantity2, image: "" },
        ],
        subtotal,
        discount,
        shipping,
        total,
        paymentMethod: "card",
        paymentStatus: paymentStatuses[i],
        orderStatus: statuses[i],
        shippingAddress: {
          fullName: customer.name,
          phone: "+1 555 0100",
          addressLine1: "123 Market Street",
          city: "San Francisco",
          state: "CA",
          postalCode: "94103",
          country: "USA",
        },
        createdAt,
      });
    }
    console.log("Created 6 demo orders.");
  }

  console.log("Demo data seed complete.");
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("Failed to seed demo data:", err.message);
  process.exit(1);
});
