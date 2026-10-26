import { Link } from 'react-router-dom';
function Header( { cartCount }){

    return(
        <>
        <div className="main-header">
            <div className="header-inner">
                <Link to="/" className="catlog-name">Product catalog</Link>
                <Link to="/cart" className="header-count">Cart {cartCount}</Link>
            </div>
        </div>
        </>
    );
}
export default Header