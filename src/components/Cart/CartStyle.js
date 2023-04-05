import React from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../elements/Button';
import CardItemCard from './CartItemCard';
import { closeCart } from '../../state/actions';
import routes from '../../constants/routes.json';
import './Cart.css';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const isCartOpen = useSelector((state) => state.isCartOpen);
  const dispatch = useDispatch();

  const cartItems = cart.map((cartItem) => (
    <CardItemCard
      key={uuidv4()}
      id={cartItem.id}
      title={cartItem.title}
      price={cartItem.price}
      image={cartItem.image}
      quantity={cartItem.quantity}
    ></CardItemCard>
  ));

  const navigateHome = () => {
    if (cartItems.length > 0) {
      dispatch(closeCart());
      history.push(routes.CHECKOUT);
    }
  };

  const sumTotal = () => {
    return cart
      .reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <div className={`cart-wrapper ${isCartOpen ? 'open' : ''}`}>
        <div className="title">Your shopping cart</div>
        <div className="products">{cartItems}</div>
        <div className="total">Total: ${sumTotal()}</div>

        <Button
          content="Checkout"
          size="wide"
          color="primary"
          animation="color"
          onClick={navigateHome}
        />
        
        <Button
          onClick={() => dispatch(closeCart())}
          content="Close"
          size="wide"
          color="red"
          animation="color"
          // style={{borderRadius:'15px'}}
          shape='round'
        />
      </div>
      {isCartOpen && <div className="overlay" onClick={() => dispatch(closeCart())}></div>}
    </>
  );
};

export default Cart;
