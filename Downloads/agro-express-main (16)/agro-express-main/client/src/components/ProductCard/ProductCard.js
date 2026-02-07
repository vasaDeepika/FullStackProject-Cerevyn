import React from "react";

function ProductCard({ data }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 mb-6" style={{ width: "20rem" }}>
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden h-64 bg-gradient-to-br from-green-50 to-emerald-50">
        <img
          src={data.img}
          alt={data.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Availability Badge */}
        {data.available ? (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            ✓ Available
          </div>
        ) : (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            Out of Stock
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
          {data.title}
        </h3>

        {/* Price with Icon */}
        <div className="flex items-center gap-2 mb-3 bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-lg">
          <span className="text-green-600 font-semibold">💰</span>
          <span className="text-lg font-bold text-green-700">{data.TodaysRate}</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-green-300 to-transparent mb-3"></div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {data.description}
        </p>

        <button
          type="button"
          className="w-full mt-4 block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-center"
          onClick={(e) => {
            e.preventDefault();
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart.push(data);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Added to cart!');
            window.location.href = '/cart';
          }}
        >
          Buy Now 🛒
        </button>
      </div>

      {/* Decorative Corner Accent */}
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-green-400/20 to-transparent rounded-tl-full"></div>
    </div>
  );
}

export default ProductCard;
