const Product = require('../models/Items');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsByPriceRange = async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  if (isNaN(minPrice) || isNaN(maxPrice)) {
    return res.status(400).json({ error: "Invalid price range" });
  }
  
  try {
    const products = await Product.find({
      price: { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExpiredProducts = async (req, res) => {
  try {
    const expiredProducts = await Product.find({ expiryDate: { $lt: new Date() } });
    res.json(expiredProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLowQuantityProducts = async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $lt: 50 } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProductPrice = async (req, res) => {
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

const deleteExpiredProducts = async (req, res) => {
  try {
    const result = await Product.deleteMany({ expiryDate: { $lt: new Date() } });
    res.json({ message: 'Expired products deleted.', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductsByPriceRange,
  getExpiredProducts,
  getLowQuantityProducts,
  updateProductPrice,
  deleteExpiredProducts,
};
