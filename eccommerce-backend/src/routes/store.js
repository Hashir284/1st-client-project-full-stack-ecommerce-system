import express from "express";

const router = express.Router();

let storeSettings = {
  name: "Mughal Ecommerce",
  email: "support@mughalstore.com",
  phone: "+92 300 0000000",
  currency: "PKR",
  freeShippingThreshold: "5000",
};

// GET /api/store/settings
router.get("/settings", (req, res) => {
  res.status(200).json({
    success: true,
    data: storeSettings,
  });
});

// PUT /api/store/settings
router.put("/settings", (req, res) => {
  const { name, email, phone, currency, freeShippingThreshold } = req.body;

  storeSettings = {
    ...storeSettings,
    ...(name && { name }),
    ...(email && { email }),
    ...(phone && { phone }),
    ...(currency && { currency }),
    ...(freeShippingThreshold && { freeShippingThreshold }),
  };

  res.status(200).json({
    success: true,
    message: "Store settings updated successfully",
    data: storeSettings,
  });
});

export default router;