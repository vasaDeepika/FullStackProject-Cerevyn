import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import farImg from "./products.png";
import { Link } from "react-router-dom";
import Services from "../Services/Services";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/v1/products");

      if (response.data.success) {
        // Transform API data to match ProductCard format
        const transformedProducts = response.data.data.map(product => ({
          img: product.img,
          title: product.productName,
          description: product.description,
          available: product.available,
          TodaysRate: `${product.quantity} per ${product.price}/-`
        }));
        setProducts(transformedProducts);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Enhanced Vibrant Hero Section */}
      <div className="hero-mesh-bg overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center relative">

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-green-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-red-100/20 rounded-full blur-3xl"></div>

          <div className="w-full md:w-1/2 mb-12 md:mb-0 text-center md:text-left z-10 animate-slide-left">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-green-700 uppercase bg-green-100 rounded-full shadow-sm">
              ✨ 100% Farm Fresh
            </span>
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 leading-[1.1]">
              Healthy Living <br />
              <span className="text-gradient-green">Starts Here.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto md:mx-0">
              Agro-Express brings premium, chemical-free vegetables directly from local sustainable farms to your kitchen.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <a href="#products" className="w-full sm:w-auto text-center bg-green-600 hover:bg-green-700 text-white font-black py-4 px-10 rounded-2xl shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95">
                Explore Harvest
              </a>
              <Link to="/about" className="w-full sm:w-auto text-center bg-white hover:bg-gray-50 text-gray-800 font-bold py-4 px-10 rounded-2xl shadow-lg border border-gray-100 transition-all">
                Our Story
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center relative animate-slide-right">
            {/* Floating Info Cards */}
            <div className="absolute -top-6 -left-6 z-20 glass-card p-4 rounded-2xl shadow-xl animate-float hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 p-2 rounded-lg text-white">🥗</div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Quality</p>
                  <p className="text-sm font-black text-gray-800">100% Organic</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 z-20 glass-card p-4 rounded-2xl shadow-xl animate-float [animation-delay:2s] hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-red-500 p-2 rounded-lg text-white">⚡</div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Speed</p>
                  <p className="text-sm font-black text-gray-800">Fast Delivery</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-green-600/10 rounded-[2rem] blur-2xl group-hover:bg-green-600/20 transition-all"></div>
              <img
                src="/website.png"
                className="relative w-full max-w-lg drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] rounded-[2rem] transform transition-transform duration-700 group-hover:scale-[1.02]"
                alt="Agro Express Home"
              />
            </div>
          </div>
        </div>
      </div>

      <h1 id="products" className="text-center text-4xl font-bold text-gray-800 mb-8 mt-8">Our Fresh <span className="text-green-600">Harvest</span></h1>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search for vegetables..."
          className="w-full max-w-lg px-6 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading fresh products...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-20">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
            <p className="font-semibold">⚠️ {error}</p>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-4 rounded-lg max-w-md text-center">
            <p className="font-semibold">📦 No products available yet</p>
            <p className="text-sm mt-2">Check back soon for fresh produce!</p>
          </div>
        </div>
      ) : (
        <div>
          <div className="product-card-container px-5 flex justify-center gap-x-5 flex-wrap">
            {products
              .filter((item) => {
                const lowerSearch = search.toLowerCase();
                return (
                  item.title.toLowerCase().includes(lowerSearch) ||
                  item.description.toLowerCase().includes(lowerSearch)
                );
              })
              .map((item, index) => (
                <ProductCard key={index} data={item} />
              ))}
          </div>
        </div>
      )}

      <hr
        className="mx-auto border-black-900 dark:border-black-900 max-w-screen-
      md:max-w-screen-md lg:max-w-screen-lg:mb-10"
      />
      <Services />
    </>
  );
}

export default Home;
