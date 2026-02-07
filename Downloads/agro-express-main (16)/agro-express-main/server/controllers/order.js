import { readData, writeData } from '../utils/storage.js';

const ORDER_FILE = 'orders.json';

const getOrders = () => readData(ORDER_FILE, []);

export const postApiOrders = async (req, res) => {
    try {
        const { user, items, totalAmount, paymentMode } = req.body;
        const orders = getOrders();

        const newOrder = {
            _id: (orders.length + 1).toString(),
            user,
            items,
            totalAmount,
            paymentMode: paymentMode || "card",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        orders.push(newOrder);
        writeData(ORDER_FILE, orders);

        res.status(201).json({
            success: true,
            data: newOrder,
            message: "Order placed successfully (LOCAL STORAGE)"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

export const getApiOrdersByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const orders = getOrders();

        // Filter orders for the specific user
        const userOrders = orders.filter(o => o.user === id).sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        res.json({
            success: true,
            data: userOrders,
            message: "Orders fetched successfully (LOCAL STORAGE)"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


