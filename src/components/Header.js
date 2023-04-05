import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Button from './elements/Button';
import routes from '../constants/routes.json';
import { openCart } from '../state/actions';

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const sumQuantity = () => {
    return cart.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0);
  };

  return (
    <header className="bg-dark">
      <div className="container d-flex align-items-center justify-content-between py-4">
        <Link to={routes.HOME} className="text-decoration-none">
          <h1 className="text-primary display-4">FakeStore</h1>
        </Link>
        <nav className="d-flex align-items-center">
          <NavbarLink to={routes.HOME} className="text-light me-5">
            Home
          </NavbarLink>
          <NavbarLink to={routes.PRODUCTS} className="text-light me-5">
            Products
          </NavbarLink>
          <div
            className="position-relative"
            onClick={() => dispatch(openCart())}
          >
            <Button content={<FaShoppingCart />} shape="round" />
            {sumQuantity() > 0 ? (
              <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger">
                {sumQuantity()}
                <span className="visually-hidden">unread messages</span>
              </span>
            ) : (
              ''
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

const NavbarLink = ({ className, ...props }) => (
  <Link
    {...props}
    className={`${className} p-1`}
    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
  />
);

export default Header;
