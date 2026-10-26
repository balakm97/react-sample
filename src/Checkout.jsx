import { useState } from 'react';
import { Link } from 'react-router-dom';

function Checkout({ cart, setCart }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const subtotal = cart.reduce(
    (total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );
  const handleSubmit = (e) => {
    e.preventDefault(); 
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setAddressError('');
    if (name.trim() === '') {
      setNameError('Name is required');
      isValid = false;
    }
    if (email.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    } else if (!email.includes('@')) {
      setEmailError('Invalid email address');
      isValid = false;
    }
    if (phone.trim() === '') {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (phone.length !== 10) {
      setPhoneError('Phone number must be 10 digits');
      isValid = false;
    }
    if (address.trim() === '') {
      setAddressError('Address is required');
      isValid = false;
    }
    if (isValid) {
      setIsSubmitted(true);
      setCart([]); 
    }
  };
  if (isSubmitted) {
    return (
      <div className="checkout-success">
        <h2>Order Placed Successfully..</h2>
        <Link to="/" className="btn-shop">Continue Shopping</Link>
      </div>
    );
  }
  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <span className="error-text">{nameError}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <span className="error-text">{emailError}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength="10"
          />
          {phoneError && <span className="error-text">{phoneError}</span>}
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {addressError && <span className="error-text">{addressError}</span>}
        </div>
        <button type="submit" className="btn-checkout">
          Place Order (${subtotal.toFixed(2)})
        </button>
      </form>
    </div>
  );
}
export default Checkout;