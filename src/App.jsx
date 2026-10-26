import { useState, useEffect } from 'react';
import './App.css';
import ProductDetail from './ProductDetail';
import { Routes, Route } from 'react-router-dom';
import Catelog from './Catelog';
import Header from './component/Header';
import Cart from './Cart'; // 1. Import Cart component
import Checkout from './Checkout';

function App() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);

      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: (Number(item.quantity) || 1) + 1 }
            : item
        );
      }

      return [
        ...prevCart,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1
        }
      ];
    });
  }

  const cartCount = cart.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  return (
    <div className="container">
      <Header cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={<Catelog addToCart={addToCart} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetail addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} />}
        />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
      </Routes>
      
    </div>
  );
}

export default App;