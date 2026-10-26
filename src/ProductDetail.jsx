
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.log(error));
  }, [id]);
  function handleAddToCart() {
    if (!product) return;
    addToCart(product);
    setMessage('Product added to cart!');
  }
  if (!product) {
    return <p>Loading product...</p>;
  }
  return (
    <div className="product-detail">
      <img src={product.thumbnail} alt={product.title} />

      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <h2>${product.price}</h2>
        <p>Discount: {product.discountPercentage}%</p>
        <p>Rating: {product.rating} / 5</p>
        <p>Brand: {product.brand || 'Not specified'}</p>
        <p>Category: {product.category}</p>
        <p>Stock: {product.stock}</p>
        <p>Availability: {product.availabilityStatus}</p>
        <p>SKU: {product.sku}</p>
        <div className="button-group">
          <button className="addtocart" onClick={handleAddToCart}>Add to Cart</button>
          <button className="addtocart"onClick={() => navigate('/cart')}>View Cart</button>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );

} 

export default ProductDetail;
