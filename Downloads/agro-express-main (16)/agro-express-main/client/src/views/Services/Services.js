import React from "react";
import sellImg from "./images/selling.png";
import buyPng from "./images/buy.png";
import vehicalpng from "./images/delivery-truck.png"

function Services() {
  return (
    <>
      <h1 className="text-center mt-10 ">Services</h1>
      <div>
        <div className="container mt-14">
          <div className="row ">
            <div className="col-md-4">
              <img src={buyPng} alt="" className=" block mx-auto h-24 p-4 border-2 border-red-500 rounded-2xl hover:shadow-lg" />
              <p className="text-center mt-2 fw-bold text-red-600">Buy Product</p>
            </div>
            <div className="col-md-4">
              <img src={sellImg} alt="" className=" block mx-auto h-24 p-4 border-2 border-red-500 rounded-2xl hover:shadow-lg" />
              <p className="text-center mt-2 fw-bold text-red-600">Sell Product</p>

            </div>
            <div className="col-md-4">
              <img src={vehicalpng} alt="" className=" block mx-auto h-24 p-4 border-2 border-red-500 rounded-2xl hover:shadow-lg" />
              <p className="text-center mt-2 fw-bold text-red-600">Transport Product</p>

            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Services;
