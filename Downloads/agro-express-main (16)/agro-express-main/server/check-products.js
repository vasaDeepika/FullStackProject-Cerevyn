import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

import Product from './models/product.js'; // Adjusting to the name used in your controllers

async function checkProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const count = await mongoose.connection.db.collection('products').countDocuments();
        console.log(`Product count: ${count}`);
        process.exit(0);
    } catch (error) {
        console.error('Error checking products:', error);
        process.exit(1);
    }
}

checkProducts();
