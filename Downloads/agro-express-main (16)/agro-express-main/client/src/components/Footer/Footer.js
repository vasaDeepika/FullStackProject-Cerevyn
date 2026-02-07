import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";

function Footer() {
  return (
    <>
      <footer className="  text-lg-s bg-red-800 text-light  ">
        <section className="flex justify-content-center justify-content-lg-between p-3 border-bottom">
          <div className="me-4 d-none d-sm-block">
            <span>
              Get connected with <b>AgroExpress</b>
            </span>
          </div>

          <div className="flex">
            <Link to="" className="me-4 text-reset">
              <FaFacebook />
            </Link>

            <Link to="" className="me-4 text-reset">
              <FaTwitterSquare />
            </Link>

            <Link to="" className="me-4 text-reset">
              <FaSquareInstagram />
            </Link>

            <Link to="" className="me-4 text-reset">
              <FaLinkedin />
            </Link>

            <Link to="" className="me-4 text-reset">
              <FaGithub />
            </Link>
          </div>
        </section>

        <section className="">
          <div className="container text-md-start mt-5 ">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <div className="text-white-600 text-xl font-bold flex-grow font-mono cursor-pointer">
                  <span className="text-4xl border-b-4">Agro</span>Express
                </div>

                <p className="mt-4">
                  It's retail shop for daily needs , widely used by people
                  living in and around
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <Link to="./../" className="text-reset a">
                    Fruits
                  </Link>
                </p>
                <p>
                  <Link to="#!" className="text-reset a">
                    Flowers
                  </Link>
                </p>
                <p>
                  <Link to="#!" className="text-reset a">
                    Leafy Vegetables
                  </Link>
                </p>
                <p>
                  <Link to="#!" className="text-reset a">
                    Fruity Vegetables
                  </Link>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 ms-5">
                <h6 className="text-uppercase fw-bold mb-4">Useful Links</h6>
                <p>
                  <Link to="/" className="text-reset ">
                    Home
                  </Link>
                </p>
                <p>
                  <Link to="/about" className="text-reset a ">
                    About
                  </Link>
                </p>
                <p>
                  <Link to="/signup" className="text-reset">
                    Signup
                  </Link>
                </p>
                <p>
                  <Link to="/login" className="text-reset">
                    Login
                  </Link>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <IoLocation />
                  Pune, 411001
                </p>
                <p>
                  <FaEnvelope />
                  agroexpress@gmail.com
                </p>
                <p>
                  <FaSquarePhone /> + 01 234 567 10
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* style="background-color: rgba(0, 0, 0, 0.05);" */}
        <div className="text-center p-4">
          Thank You from ❤️
          <Link className="text-reset fw-bold " to="">
            {" "}
            AgroExpress
          </Link>
        </div>
      </footer>
    </>
  );
}

export default Footer;
