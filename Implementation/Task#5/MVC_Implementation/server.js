require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const ItemsController = require('./controller/ItemsController');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();


app.use(express.json());

app.get('/api/products', ItemsController.getAllProducts);
app.get('/api/products/price-range', ItemsController.getProductsByPriceRange);
app.get('/api/products/expired', ItemsController.getExpiredProducts);
app.get('/api/products/low-quantity', ItemsController.getLowQuantityProducts);
app.put('/api/products/update-price', ItemsController.updateProductPrice);
app.delete('/api/products/expired', ItemsController.deleteExpiredProducts);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
