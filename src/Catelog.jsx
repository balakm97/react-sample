import { useEffect, useState } from 'react';
import Productcard from './component/Productcard';

function Catelog({ addToCart , searchQuery }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.log(error));
  }, []);

  const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes((searchQuery || '').toLowerCase()) 
  );

  return (
    <div className="main-products">
      {filteredProducts.map(product => (
        <Productcard
          key={product.id}
          id={product.id}
          thumbnail={product.thumbnail}
          title={product.title}
          description={product.description}
          addtoCart={() => addToCart(product)}
        />
      ))}
    </div>
  );
}

export default Catelog;