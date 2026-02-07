import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: false // Optional for now as we might store product details directly if product is deleted
            },
            title: { type: String, required: true },
            quantity: { type: String, required: true },
            price: { type: Number, required: true },
            img: { type: String }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'completed',
        enum: ['pending', 'completed', 'shipped', 'delivered', 'cancelled']
    },
    paymentMode: {
        type: String,
        required: true,
        default: 'card'
    },
    shippingAddress: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Order = model("Order", orderSchema);
export default Order;
