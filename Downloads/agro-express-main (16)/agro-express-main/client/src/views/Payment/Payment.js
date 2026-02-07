import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import swal from "sweetalert";

function Payment() {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const pendingOrder = JSON.parse(localStorage.getItem("pendingOrder"));
        if (!pendingOrder) {
            window.location.href = "/cart";
        } else {
            setOrder(pendingOrder);
        }
    }, []);

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(async () => {
            try {
                const orderWithPayment = {
                    ...order,
                    paymentMode: paymentMethod
                };
                const response = await axios.post("/api/v1/orders", orderWithPayment);

                if (response.data.success) {
                    localStorage.removeItem("cart");
                    localStorage.removeItem("pendingOrder");
                    swal({
                        title: "Payment Successful! 🎉",
                        text: "Your fresh vegetables are on the way!",
                        icon: "success",
                        button: "View My Orders",
                    }).then(() => {
                        window.location.href = "/my-orders";
                    });
                } else {
                    swal("Error", "Failed to place order after payment.", "error");
                }
            } catch (error) {
                console.error("Payment error:", error);
                swal("Error", "Something went wrong during payment processing.", "error");
            } finally {
                setIsProcessing(false);
            }
        }, 3000);
    };

    if (!order) return null;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <div className="container mx-auto px-4 py-12 flex-grow">
                    <div className="max-w-5xl mx-auto">
                        {/* Header Section with Animation */}
                        <div className="text-center mb-10 animate-[fadeIn_0.5s_ease-out]">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                                Secure Checkout <span className="text-green-600">Agro-Express</span>
                            </h1>
                            <p className="text-gray-500 font-medium tracking-wide">
                                Final step to secure your fresh delivery 🚛
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            {/* Payment Selection - Left Column */}
                            <div className="lg:col-span-8">
                                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all hover:shadow-green-100/50">
                                    <div className="bg-green-600 p-6 flex justify-between items-center">
                                        <h2 className="text-xl font-bold text-white uppercase tracking-widest">Payment Method</h2>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">🔐</div>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <div className="space-y-4">
                                            {/* Card Selection */}
                                            <div
                                                onClick={() => setPaymentMethod('card')}
                                                className={`group p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform ${paymentMethod === 'card' ? 'border-green-600 bg-green-50/50 shadow-inner' : 'border-gray-100 hover:border-green-200 hover:bg-gray-50'}`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'card' ? 'border-green-600' : 'border-gray-300'}`}>
                                                            {paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-green-600 animate-[scaleIn_0.2s_ease-out]"></div>}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-800 text-lg">Credit / Debit Card</p>
                                                            <p className="text-sm text-gray-500">Fast & Secure Processing</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6 grayscale group-hover:grayscale-0 transition-all" />
                                                        <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6 grayscale group-hover:grayscale-0 transition-all" />
                                                    </div>
                                                </div>

                                                {paymentMethod === 'card' && (
                                                    <div className="mt-8 space-y-4 animate-[slideDown_0.3s_ease-out]">
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-3.5 text-gray-400">👤</span>
                                                            <input type="text" placeholder="Cardholder Name" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-sm" />
                                                        </div>
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-3.5 text-gray-400">💳</span>
                                                            <input type="text" placeholder="Card Number" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-sm" />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <input type="text" placeholder="MM / YY" className="px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-sm" />
                                                            <input type="text" placeholder="CVV" className="px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-sm" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* UPI Selection with QR Code */}
                                            <div
                                                onClick={() => setPaymentMethod('upi')}
                                                className={`group p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform ${paymentMethod === 'upi' ? 'border-green-600 bg-green-50/50 shadow-inner' : 'border-gray-100 hover:border-green-200 hover:bg-gray-50'}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'upi' ? 'border-green-600' : 'border-gray-300'}`}>
                                                        {paymentMethod === 'upi' && <div className="w-3 h-3 rounded-full bg-green-600 animate-[scaleIn_0.2s_ease-out]"></div>}
                                                    </div>
                                                    <div className="flex-grow">
                                                        <p className="font-bold text-gray-800 text-lg">UPI / QR Code</p>
                                                        <p className="text-sm text-gray-500">Scan via GPay, PhonePe or enter VPA</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">FAST</span>
                                                    </div>
                                                </div>

                                                {paymentMethod === 'upi' && (
                                                    <div className="mt-8 flex flex-col md:flex-row items-center gap-8 animate-[slideDown_0.3s_ease-out]">
                                                        <div className="bg-white p-4 rounded-3xl shadow-xl border border-dashed border-green-200 group-hover:rotate-1 transition-transform relative">
                                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">Scan to Pay</div>
                                                            <img
                                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=agroexpress@upi&pn=AgroExpress&am=${order.totalAmount}&cu=INR`}
                                                                alt="UPI QR Code"
                                                                className="w-40 h-40 rounded-xl"
                                                            />
                                                            <div className="mt-2 text-center">
                                                                <p className="text-[10px] text-gray-400 font-bold uppercase">AgroExpress Merchant</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow w-full space-y-4">
                                                            <p className="text-sm text-gray-600 font-medium italic">Alternatively, enter your Virtual Private Address (VPA)</p>
                                                            <input
                                                                type="text"
                                                                placeholder="username@upi"
                                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-sm"
                                                            />
                                                            <div className="flex items-center gap-2 px-2">
                                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                                                <span className="text-[10px] text-gray-400 font-bold">Encrypted End-to-End</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* COD Selection */}
                                            <div
                                                onClick={() => setPaymentMethod('cod')}
                                                className={`group p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform ${paymentMethod === 'cod' ? 'border-green-600 bg-green-50/50 shadow-inner' : 'border-gray-100 hover:border-green-200 hover:bg-gray-50'}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'cod' ? 'border-green-600' : 'border-gray-300'}`}>
                                                        {paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-green-600 animate-[scaleIn_0.2s_ease-out]"></div>}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-800 text-lg">Cash on Delivery</p>
                                                        <p className="text-sm text-gray-500">Pay at your doorstep</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handlePayment}
                                            disabled={isProcessing}
                                            className={`w-full mt-10 relative overflow-hidden group py-5 rounded-2xl text-white font-extrabold text-xl shadow-2xl transition-all active:scale-[0.98] ${isProcessing ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                                        >
                                            <span className={`relative z-10 transition-all flex items-center justify-center gap-3 ${isProcessing ? 'opacity-50' : ''}`}>
                                                {isProcessing ? "SECURE TRANSACTION..." : `PAY ₹${order.totalAmount} NOW`}
                                                {!isProcessing && <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>}
                                            </span>
                                            {isProcessing && (
                                                <div className="absolute inset-0 bg-green-500/20 animate-[pulse_1s_infinite]"></div>
                                            )}
                                        </button>

                                        <div className="mt-6 flex items-center justify-center gap-6">
                                            <img src="https://img.icons8.com/color/48/000000/safe.png" alt="safe" className="h-4" />
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">PCI DSS Compliant Infrastructure</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Detail - Right Column */}
                            <div className="lg:col-span-4">
                                <div className="sticky top-24 space-y-6">
                                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transform transition-all hover:scale-[1.02]">
                                        <div className="bg-gray-800 p-5 text-center">
                                            <h3 className="text-white font-bold tracking-widest text-sm uppercase">Order Receipt</h3>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-4 mb-6 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                                {order.items.map((item, i) => (
                                                    <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                                        <div className="flex gap-3 items-center">
                                                            <img src={item.img} className="w-10 h-10 rounded-lg object-cover" alt="" />
                                                            <div>
                                                                <p className="font-bold text-gray-800 truncate w-32">{item.title}</p>
                                                                <p className="text-[10px] text-gray-400 font-bold">{item.quantity}</p>
                                                            </div>
                                                        </div>
                                                        <span className="font-mono text-green-700 font-bold">₹{item.price}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="space-y-3 pt-4 border-t border-gray-100 font-semibold text-sm">
                                                <div className="flex justify-between text-gray-500">
                                                    <span>Grand Subtotal</span>
                                                    <span className="text-gray-800">₹{order.totalAmount}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500">Fresh Pass Delivery</span>
                                                    <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-[10px]">FREE</span>
                                                </div>
                                                <div className="flex justify-between text-2xl font-black text-gray-900 pt-6 border-t-2 border-dashed border-gray-200 mt-4 relative">
                                                    <div className="absolute -top-3 left-0 w-full flex justify-between px-2 text-[8px] text-gray-300 font-bold uppercase tracking-[0.5em]">Tax Included</div>
                                                    <span>PAYMENT</span>
                                                    <span className="text-green-600">₹{order.totalAmount}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 p-5 rounded-3xl border border-green-100 shadow-sm relative overflow-hidden group">
                                        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-green-600/10 rounded-full group-hover:scale-150 transition-transform"></div>
                                        <p className="text-[10px] font-black text-green-700 uppercase mb-2 tracking-widest">Shipping To:</p>
                                        <p className="text-sm text-green-900 font-bold line-clamp-3 leading-relaxed">
                                            {order.shippingAddress}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; height: 0; transform: translateY(-20px); }
          to { opacity: 1; height: auto; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}} />
        </>
    );
}

export default Payment;
