import seedProducts from '../seedProducts.js';
import { readData, writeData } from '../utils/storage.js';

const PRODUCT_FILE = 'products.json';

// Initialize products with seed data if file doesn't exist
const getProducts = () => {
  // Transform seed data to have IDs if they don't
  const initialData = seedProducts.map((p, index) => ({
    ...p,
    _id: (index + 1).toString(),
    price: Number(p.price),
    user: "mock_user_123",
    createdAt: new Date(),
    updatedAt: new Date()
  }));
  return readData(PRODUCT_FILE, initialData);
};

const postApiProduct = async (req, res) => {
  const { user, productName, price, quantity, description } = req.body;

  try {
    const products = getProducts();

    const newProduct = {
      _id: (products.length + 1).toString(), // Simple incrementing ID
      user: user || "mock_user_123",
      productName,
      price,
      quantity,
      description,
      img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2787&auto=format&fit=crop", // Default placeholder
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    products.push(newProduct);
    writeData(PRODUCT_FILE, products);

    res.json({
      success: true,
      data: newProduct,
      message: "Product added successfully (LOCAL STORAGE)"
    })
  } catch (err) {
    res.json({
      success: false,
      message: err.message
    })
  }
}

const getApiProductsById = async (req, res) => {
  const { id } = req.params;
  const products = getProducts();

  const userProducts = products.filter(p => p.user === id || p.user === "mock_user_123");

  const populatedProducts = userProducts.map(p => ({
    ...p,
    user: { _id: "mock_user_123", name: "Mock User", email: "mock@example.com" }
  }));

  res.json({
    success: true,
    data: populatedProducts,
    message: "product successfully fetch by user (LOCAL STORAGE)",
  });
}

const putApiTransactionsById = async (req, res) => {
  const { id } = req.params;
  const { productName, price, quantity, description } = req.body;

  const products = getProducts();
  const index = products.findIndex(p => p._id === id);

  if (index !== -1) {
    products[index] = {
      ...products[index],
      productName,
      price,
      quantity,
      description
    };

    writeData(PRODUCT_FILE, products);

    res.json({
      success: true,
      data: products[index],
      message: 'Update Successfully (LOCAL STORAGE)'
    });
  } else {
    res.json({
      success: false,
      message: 'Product not found (LOCAL STORAGE)'
    });
  }
}

const getApiProducts = async (req, res) => {
  const { id } = req.params;
  const products = getProducts();
  const product = products.find(p => p._id === id);

  if (product) {
    res.status(200).json({
      success: true,
      data: product,
      message: "Product found successfully (LOCAL STORAGE)."
    })
  } else {
    res.status(400).json({
      success: false,
      message: "Product Not Found."
    });
  }
}

const getApiAllProducts = async (req, res) => {
  const products = getProducts();
  res.json({
    success: true,
    data: products,
    message: "All Products fetched successfully (LOCAL STORAGE)."
  });
}


export { postApiProduct, getApiProductsById, putApiTransactionsById, getApiProducts, getApiAllProducts }