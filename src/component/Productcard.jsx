import { Link } from 'react-router-dom';
function Productcard( { thumbnail , title , description , addtoCart , id}){
    return(
        <>
        <div className="product-card" key={ id }>
                    <img src= { thumbnail } />
                    <div className="produt-details">
                        <Link to={`/product/${id}`}>{title}</Link>
                        <p>{ description }</p>
                        <button className = "add-to-cart" onClick ={ addtoCart }>Add to cart </button>
                    </div>
        </div>
        </>
    );
}
export default Productcard