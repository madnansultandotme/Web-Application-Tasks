const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const db = require('./config/db');
const ItemsController = require('./controller/ItemsController');

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.get('/api/products', ItemsController.getAllProducts);
app.get('/api/products/price-range', ItemsController.getProductsByPriceRange);
app.get('/api/products/expired', ItemsController.getExpiredProducts);
app.get('/api/products/low-quantity', ItemsController.getLowQuantityProducts);
app.get('/api/products/firm/:firmName', ItemsController.getProductsByFirm);
app.delete('/api/products/expired', ItemsController.deleteExpiredProducts);
app.put('/api/products/update-price', ItemsController.updateProductPrices);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
