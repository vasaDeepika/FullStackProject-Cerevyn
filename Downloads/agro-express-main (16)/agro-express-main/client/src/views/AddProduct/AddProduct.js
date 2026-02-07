import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import showToast from "crunchy-toast";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  const addProducts = async () => {
    const user = JSON.parse(localStorage.getItem("user" || "{}"));
    const response = await axios.post("/api/v1/products", {
      user: user._id,
      productName,
      price,
      quantity,
      description,
      img,
    });
    console.log(response.data.data);

    if (response?.data?.data) {
      alert("Your Product saved successfully");
      window.location.href = "/";
    } else {
      alert(response?.data?.message);
    }
  };

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem("user" || "{}"));
    if (!store?.name) {
      alert("You login first");
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(userObj);

    // Assuming the role is stored in userObj.role
    const isAdmin = userObj?.role === "admin";

    if (isAdmin) {
      alert("You are an admin. You cannot add products or access permissions.");
      window.location.href = "/showproduct";
    }
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <form className="form-control mx-auto " action="">
          <p className="title">Add Your Products</p>

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
              <option value="" disabled className="text-red-600">
                Select Quantity Here
              </option>
              <option value="1kg">1 Kg</option>
              <option value="2kg">2 Kg</option>
              <option value="3kg">3 Kg</option>
              <option value="4kg">4 Kg</option>
              <option value="5kg">5 Kg</option>
              <option value="10kg">10 Kg</option>
            </select>
          </div>

          <div className="input-field">
            <input
              required=""
              className="input"
              type="text"
              value={img}
              onChange={(e) => {
                setImg(e.target.value);
              }}
            />
            <label className="label" for="input">
              Enter Image URL
            </label>
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

          <button
            type="button"
            className="submit-btn bg-red-600"
            onClick={addProducts}
          >
            Add Products
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
