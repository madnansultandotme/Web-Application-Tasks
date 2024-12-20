const mongoose = require('mongoose');
const fs = require('fs');
const csvParser = require('csv-parser');
const Product = require('../models/Items'); // Ensure the model is correctly imported

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database.');

    // Populate the database from CSV
    const filePath = './productsInformation.csv'; // Path to the CSV file

    // Check if the database is already populated
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('No products found in the database. Populating from CSV...');
      const products = [];

      // Read and parse the CSV file
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          try {
            // Parse and validate the data
            const productName = row.product_name;
            const firmName = row.firm_name;
            const price = parseFloat(row.price);
            const quantity = parseInt(row.quantity, 10);
            const expiryDate = new Date(row.expiry_date);

            // Skip invalid rows
            if (
              isNaN(price) ||
              isNaN(quantity) ||
              !productName ||
              !firmName ||
              isNaN(expiryDate.getTime())
            ) {
              console.warn('Skipping invalid row:', row);
              return;
            }

            // Push valid products to the array
            products.push({
              productName,
              firmName,
              price,
              quantity,
              expiryDate,
            });
          } catch (error) {
            console.error('Error parsing row:', row, error.message);
          }
        })
        .on('end', async () => {
          try {
            if (products.length > 0) {
              await Product.insertMany(products);
              console.log('Database populated successfully with CSV data.');
            } else {
              console.log('No valid data found in the CSV file.');
            }
          } catch (error) {
            console.error('Error populating database:', error.message);
          }
        });
    } else {
      console.log('Database already populated. Skipping CSV import.');
    }
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectDB;
