import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import path from 'path';
import Supplier from './models/Supplier.js';


import { fileURLToPath } from 'url';

dotenv.config();

import { getApiHealths } from './controllers/health.js'
import { postApiSignups, postApiLogins, putUserProfile } from './controllers/user.js';
import { postApiProduct, getApiProductsById, putApiTransactionsById, getApiProducts, getApiAllProducts } from './controllers/product.js';
import { postApisellsupplyes } from './controllers/supplier.js'
import { postApiOrders, getApiOrdersByUserId } from './controllers/order.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(express.json());

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected Successfully.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    // process.exit(1); // Allow server to run without DB
  }
};

await connectionDB();

app.get('/api/v1/healths', getApiHealths);

//signup api//

app.post('/api/v1/signups', postApiSignups);

// login api//
app.post('/api/v1/logins', postApiLogins);

// profile update api
app.put('/api/v1/users/:id', putUserProfile);

//products api
app.post('/api/v1/products', postApiProduct);

app.get('/api/v1/products/user/:id', getApiProductsById);  //for populate by user

//put - /api/products/:id
app.put("/api/v1/products/:id", putApiTransactionsById);

//get - /api/v1/products/${id}
app.get('/api/v1/products/:id', getApiProducts);

//get - /api/v1/products
app.get('/api/v1/products', getApiAllProducts);

//post - /api/v1/sellsupplyes

app.post('/api/v1/sellsupplyes', postApisellsupplyes);

app.post('/api/v1/sellsupplyes', postApisellsupplyes);

// order api
app.post('/api/v1/orders', postApiOrders);
app.get('/api/v1/orders/user/:id', getApiOrdersByUserId);

const port = process.env.PORT || 8080;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});