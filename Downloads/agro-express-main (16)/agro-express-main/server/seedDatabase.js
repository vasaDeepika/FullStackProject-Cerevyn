import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import seedProducts from './seedProducts.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert seed products
        await Product.insertMany(seedProducts);
        console.log(`✅ Successfully seeded ${seedProducts.length} products!`);

        // Close connection
        mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
