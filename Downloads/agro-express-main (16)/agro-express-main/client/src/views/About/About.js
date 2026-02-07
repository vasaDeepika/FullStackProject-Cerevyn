import React from "react";
import Navbar from "../../components/Navbar/Navbar";

function About() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-center text-5xl font-bold mb-12 text-green-700">
          About <span className="text-red-600">Agro-Express</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="bg-green-50 p-8 rounded-xl shadow-md border-l-4 border-green-600">
            <h2 className="text-3xl font-semibold text-green-800 mb-4">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Agro-Express was born from a simple idea: everyone deserves access to fresh, healthy,
              and chemical-free vegetables. We noticed the gap between hardworking farmers and consumers
              seeking quality produce. By eliminating middlemen, we bring the farm directly to your table,
              ensuring freshness that you can taste.
            </p>
          </div>
          <div className="bg-red-50 p-8 rounded-xl shadow-md border-r-4 border-red-600">
            <h2 className="text-3xl font-semibold text-red-800 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We aim to empower local farmers by providing them with a fair marketplace while offering
              consumers the best prices. Our goal is to promote sustainable agriculture and healthy living
              across the community, one vegetable basket at a time.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Agro-Express?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-2 text-green-700">100% Fresh</h3>
              <p className="text-gray-600">Harvested daily and delivered fresh to maintain nutritional value.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2 text-green-700">Fair Pricing</h3>
              <p className="text-gray-600">Direct-to-consumer model means better prices for you and the farmers.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2 text-green-700">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable delivery service right to your doorstep.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-2xl p-10 text-center shadow-inner max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-green-900 mb-4">Meet the Visionary</h2>
          <p className="text-xl text-green-800 mb-6 font-medium">
            "We believe in a future where healthy food is accessible to everyone."
          </p>
          <div className="inline-block bg-white px-8 py-3 rounded-full shadow-md">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-600">
              Created by Deepika
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
