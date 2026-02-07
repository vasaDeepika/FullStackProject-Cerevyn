import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [user, setUser] = useState({});

  useEffect(() => {
    //get Loggedin user from local storage
    const getLoggedInUserFromLocalStorage = JSON.parse(
      localStorage.getItem("user" || "{}")
    );
    setUser(getLoggedInUserFromLocalStorage);
    console.log(getLoggedInUserFromLocalStorage);
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <nav className="bg-white shadow-sm py-3">
          <div className="container mx-auto flex justify-between items-center ">
            {/* Logo */}
            <div className="text-red-600 text-xl font-bold flex-grow font-mono cursor-pointer">
              <span className="text-3xl">Agro</span>Express
            </div>

            {/* Navbar Links */}
            <div className="hidden md:flex items-center space-x-6 flex-grow">
              <Link to="/" className="text-black no-underline">
                Home
              </Link>
              <Link to="/addproduct" className="text-black no-underline">
                Add Products
              </Link>
              <Link to="/cart" className="text-black no-underline">
                Cart
              </Link>
              <Link to="/my-orders" className="text-black no-underline">
                My Orders
              </Link>
              <Link to="/about" className="text-black no-underline">
                About
              </Link>
              <Link to="/profile" className="text-black no-underline">
                Profile
              </Link>
              <Link to="/signup" className="text-black no-underline">
                Signup
              </Link>
              <Link to="/login" className="text-black no-underline">
                Login
              </Link>
            </div>

            <div className="hidden md:flex align-start text-black hover:text-violet-600 cursor-pointer font-semibold">
              {user?.name ? "Welcome back," : ""} {user?.name || "Hello User"}!{" "}
              {user?.name ? (
                <span
                  className="text-black cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                  }}>{" "}
                  <button type="button" className="ms-4 bg-red-600 py-1 px-3 text-white rounded-lg">Logout</button>
                </span>
              ) : null}
            </div>

            {/* Mobile Navbar Toggle */}
            <div className="md:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="text-black ">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Navbar (hidden by default) */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? "" : "hidden"
          } bg-gray-100 p-4 text-black`}>
        <ul className="list-none p-0 m-0">
          <li>
            <Link to="/" className="block py-2 text-black no-underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/addproduct" className="block py-2 text-black no-underline">
              Add Product
            </Link>
          </li>
          <li>
            <Link to="/cart" className="block py-2 text-black no-underline">
              Cart
            </Link>
          </li>
          <li>
            <Link to="/my-orders" className="block py-2 text-black no-underline">
              My Orders
            </Link>
          </li>
          <li>
            <Link to="/about" className="block py-2 text-black no-underline">
              About
            </Link>
          </li>
          <li>
            <Link to="/signup" className="block py-2 text-black no-underline">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/login" className="block py-2 text-black no-underline">
              Login
            </Link>
          </li>

          <div className="font-semibold">
            {user?.name ? "Welcome back," : ""} {user?.name || "Hello User "}{" "}
            !
            {user?.name ? (
              <span
                className="text-black hover:text-red-600 cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}>
                {" "}
                <button className="ms-4 bg-red-600 py-1 px-3 text-white rounded-lg">Logout</button>
              </span>
            ) : null}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
