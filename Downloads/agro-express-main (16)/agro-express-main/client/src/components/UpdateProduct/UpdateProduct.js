import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios"
import showToast from 'crunchy-toast'
import { useParams } from "react-router-dom";

function UpdateProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();

  const loadProduct = async () => {
    const response = await axios.get(`/api/v1/products/${id}`);

    const {
      productName,
      price,
      quantity,
      description
    } = response?.data?.data;

    console.log(response?.data?.data);

    setProductName(productName);
    setPrice(price);
    setQuantity(quantity);
    setDescription(description)
  };

  useEffect(() => {
    loadProduct();
  }, []);

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem("user" || "{}"));
    if (!store?.name) {
      alert("You login first");
      window.location.href = "/login";
    }
  }, []);

  const updateProducts = async () => {

    if (!productName) {
      showToast("Product Name is required", "alert", 4000);
      return;
    }
    if (!quantity) {
      showToast("Quantity is required", "alert", 4000);
      return;
    }

    const updateProductDetails = {
      productName: productName,
      price: price,
      quantity: quantity,
      description: description

    };

    const response = await axios.put(`/api/v1/products/${id}`, updateProductDetails);

    if (response?.data?.message) {
      alert("Your transations have been Updated Successfully.");

      window.location.href = "/showproduct";
    }
  }

  return (
    <>
      <Navbar />
      <div>
        <form className="form-control mx-auto " action="">
          <p className="title">Update Your Products</p>
          <div className="input-field">
            <input
              required=""
              className="input"
              type="text"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
            <label className="label" for="input">
              Enter Product Name
            </label>
          </div>

          <div className="input-field">
            <input
              required=""
              className="input"
              type="text"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <label className="label" for="input">
              Enter Price
            </label>
          </div>

          <div className="input-field">
            <select
              className="w-full p-2 border rounded"
              name="quantity"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            >
              <option value="" disabled className="text-red-600">Select Quantity Here</option>
              <option value="one">50 kg</option>
              <option value="two">1 Quintal</option>
              <option value="three">2 Quintal</option>
              <option value="four">3 Quintal</option>
              <option value="five">4 Quintal</option>
            </select>
          </div>

          <div className="input-field">
            <textarea
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Description"
              className="w-full p-2 border rounded"
            ></textarea>
          </div>

          <button type="button" className="submit-btn bg-red-600"
            onClick={updateProducts}
          >
            Update Products
          </button>
        </form>

      </div>

    </>
  );
}

export default UpdateProduct;
