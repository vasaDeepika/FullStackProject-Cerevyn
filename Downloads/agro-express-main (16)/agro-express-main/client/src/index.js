import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Home from "./views/Home/Home"
import ShowProduct from './views/ShowProduct/ShowProduct';
import About from "./views/About/About";
import AddProduct from "./views/AddProduct/AddProduct"
import UpdateProduct from './components/UpdateProduct/UpdateProduct';
import Signup from "./views/Signup/Signup";
import Login from "./views/Login/Login";
import MyOrders from "./views/MyOrders/MyOrders";
import Profile from "./views/Profile/Profile";
import Payment from "./views/Payment/Payment";
import SaleProduct from './views/SaleProducts/SaleProduct';

const router = createBrowserRouter([{
  path: '/',
  element: <Home />
},
{
  path: '/my-orders',
  element: <MyOrders />
},
{
  path: '/profile',
  element: <Profile />
},
{
  path: '/payment',
  element: <Payment />
},
{
  path: '/about',
  element: <About />
},
{
  path: '/addproduct',
  element: <AddProduct />
},
{
  path: '/cart',
  element: <ShowProduct />
},
{
  path: '/updateproduct/:id',
  element: <UpdateProduct />
},
{
  path: '/saleproduct/product/:id',
  element: <SaleProduct />
},
{
  path: '/signup',
  element: <Signup />
},
{
  path: '/login',
  element: <Login />
}

]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

