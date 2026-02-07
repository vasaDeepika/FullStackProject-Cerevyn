import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const user = JSON.parse(localStorage.getItem("user" || "{}"));
            if (!user?._id) {
                window.location.href = "/login";
                return;
            }

            try {
                const response = await axios.get(`/api/v1/orders/user/${user._id}`);
                setOrders(response.data.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-green-700">My Orders 📦</h1>

                {loading ? (
                    <div className="text-center py-10">
                        <div className="spinner-border text-green-600" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600 mb-6">You haven't placed any orders yet.</p>
                        <Link to="/" className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b pb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Order ID: <span className="font-mono text-gray-800">{order._id}</span></p>
                                        <p className="text-sm text-gray-500">Date: <span className="text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</span> at <span className="text-gray-800">{new Date(order.createdAt).toLocaleTimeString()}</span></p>
                                    </div>
                                    <div className="mt-2 md:mt-0 flex gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase bg-gray-100 text-gray-700 border border-gray-200`}>
                                            💳 {order.paymentMode || 'card'}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${order.status === 'delivered' || order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-semibold text-gray-700 mb-2">Items:</h4>
                                    <ul className="list-disc pl-5 text-gray-600">
                                        {order.items.map((item, index) => (
                                            <li key={index}>
                                                {item.title} - {item.quantity} x ₹{item.price}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-gray-600 font-semibold">Total Amount:</span>
                                    <span className="text-2xl font-bold text-green-700">₹{order.totalAmount}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default MyOrders;
