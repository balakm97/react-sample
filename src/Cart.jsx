import { Link , useNavigate } from 'react-router-dom';
function Cart({ cart, setCart }) {
    const navigate = useNavigate();
    const updateQuantity = (id, newQuantity) => {
    const qty = Number(newQuantity);
    if (qty <= 0) {
      removeFromCart(id);
      return;
    } 
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };
  const clearCart = () => {
    setCart([]);
  };
  const subtotal = cart.reduce(
    (total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );
  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout');
  };
  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <Link to="/" className="btn-shop">
          Shopping
        </Link>
      </div>
    );
  }
  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-container">
        {/* Cart Items List */}
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
              <div className="cart-item-info">
                <Link to={`/product/${item.id}`} className="cart-item-title">
                  {item.title}
                </Link>
                <p className="cart-item-price">${item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="cart-item-quantity">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button 
                className="btn-remove" 
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <button className="btn-clear" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
        <div className="cart-summary">
          <h2>Order Details</h2>
          <div className="summary-row">
            <span>Total Items:</span>
            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>
          <div className="summary-row total">
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button className="btn-checkout" onClick={handleCheckout}>
            Checkout
          </button>
          <Link to="/" className="continue-shopping-link">
            Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Cart;