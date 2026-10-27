import { Link } from 'react-router-dom';
function Header( { cartCount , searchQuery, onSearchChange}){

    return(
        <>
        <div className="main-header">
            <div className="header-inner">
                <Link to="/" className="catlog-name">Product catalog</Link>
                <input type="text" className="customSearch" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)}   placeholder ="Search by product title"></input>
                <Link to="/cart" className="header-count">Cart {cartCount}</Link>
            </div>
        </div>
        </>
    );
}
export default Header