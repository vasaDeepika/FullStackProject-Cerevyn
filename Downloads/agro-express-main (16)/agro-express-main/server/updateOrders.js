import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from './models/Order.js';

dotenv.config();

const updateOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');

        const result = await Order.updateMany(
            {},
            { $set: { status: 'completed', paymentMode: 'card' } }
        );

        console.log(`✅ Updated ${result.modifiedCount} orders to 'completed' status.`);

        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error updating orders:', error);
        process.exit(1);
    }
};

updateOrders();
