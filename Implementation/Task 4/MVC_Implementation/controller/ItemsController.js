const Product = require('../models/Items');

// Fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch products within a price range
exports.getProductsByPriceRange = async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  try {
    const products = await Product.find({
      price: { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch expired products
exports.getExpiredProducts = async (req, res) => {
  try {
    const expiredProducts = await Product.find({ expiryDate: { $lt: new Date() } });
    res.json(expiredProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch products with low quantity
exports.getLowQuantityProducts = async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $lt: 50 } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch products of a specific firm
exports.getProductsByFirm = async (req, res) => {
  const { firmName } = req.params;
  try {
    const products = await Product.find({ firmName });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete expired products
exports.deleteExpiredProducts = async (req, res) => {
  try {
    const result = await Product.deleteMany({ expiryDate: { $lt: new Date() } });
    res.json({ message: 'Expired products deleted.', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product prices by firm
exports.updateProductPrices = async (req, res) => {
  const { firmName, newPrice } = req.body;
  try {
    const result = await Product.updateMany(
      { firmName },
      { $set: { price: parseFloat(newPrice) } }
    );
    res.json({ message: 'Prices updated successfully.', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
