import React, { useEffect, useState } from "react";
import "./ShowProduct.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import axios from 'axios';

function ShowProduct() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    // Assuming TodaysRate format is like "1kg per 50/-" and we extract 50
    // This is a basic extraction, might need more robust parsing depending on actual data format
    return cart.reduce((total, item) => {
      const priceMatch = item.TodaysRate?.match(/(\d+)\/-?/);
      const price = priceMatch ? parseInt(priceMatch[1]) : 0;
      return total + price;
    }, 0);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Your Shopping Cart 🛒</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-6">Your cart is empty.</p>
            <Link to="/" className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="lg:w-2/3">
              {cart.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition">
                  <img src={item.img} alt={item.title} className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-6" />

                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    <p className="text-green-600 font-bold mt-2">{item.TodaysRate}</p>
                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="mt-4 sm:mt-0 ml-0 sm:ml-4 text-red-500 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Order Summary</h2>

                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                  <span className="font-semibold">₹{calculateTotal()}</span>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-green-700">₹{calculateTotal()}</span>
                  </div>
                </div>

                <button
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-lg transform active:scale-95"
                  onClick={() => {
                    const user = JSON.parse(localStorage.getItem("user" || "{}"));
                    if (!user?.name) {
                      swal("Please Login", "You need to be logged in to place an order.", "warning")
                        .then(() => {
                          window.location.href = "/login";
                        });
                      return;
                    }

                    swal({
                      title: "Confirm Order?",
                      text: `Total Amount: ₹${calculateTotal()}`,
                      icon: "info",
                      buttons: ["Cancel", "Payment"],
                      dangerMode: false,
                    })
                      .then(async (willPay) => {
                        if (willPay) {
                          const orderDetails = {
                            user: user._id,
                            items: cart.map(item => ({
                              product: item._id,
                              title: item.title,
                              quantity: item.TodaysRate || "1 unit",
                              price: parseInt(item.TodaysRate?.match(/(\d+)\/-?/)?.[1] || 0),
                              img: item.img
                            })),
                            totalAmount: calculateTotal(),
                            shippingAddress: user.address || "Default Address"
                          };

                          localStorage.setItem("pendingOrder", JSON.stringify(orderDetails));
                          window.location.href = "/payment";
                        }
                      });
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ShowProduct;
