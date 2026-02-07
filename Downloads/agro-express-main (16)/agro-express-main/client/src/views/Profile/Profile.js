import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import swal from "sweetalert";

function Profile() {
    const [user, setUser] = useState({});
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (!loggedInUser._id) {
            window.location.href = "/login";
        } else {
            setUser(loggedInUser);
            setMobile(loggedInUser.mobile || "");
            setAddress(loggedInUser.address || "");
        }
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put(`/api/v1/users/${user._id}`, {
                mobile,
                address,
            });

            if (response.data.success) {
                const updatedUser = { ...user, mobile, address };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUser(updatedUser);
                swal("Success", "Profile updated successfully!", "success");
            } else {
                swal("Error", response.data.message, "error");
            }
        } catch (error) {
            console.error("Update error:", error);
            swal("Error", "Failed to update profile", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-green-600 px-8 py-10 text-white text-center">
                        <h1 className="text-3xl font-bold mb-2">My Profile 👤</h1>
                        <p className="opacity-90">Manage your account details and shipping address</p>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b pb-8">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
                                <p className="text-lg font-semibold text-gray-800">{user.email}</p>
                            </div>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    placeholder="Enter your mobile number"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Shipping Address</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition h-32 resize-none"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter your full delivery address"
                                    required
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition transform active:scale-95 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                                        }`}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Updating...
                                        </span>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
