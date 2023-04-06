import React from 'react';
import PropTypes from 'prop-types';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Button from '../elements/Button';
import { addToCart, removeFromCart } from '../../state/actions';

const CardItemCard = ({ id, title, price, image, quantity, donNotShow }) => {
  const cartItem = { id, title, price, image, quantity };
  const product = { id, title, price, image };
  const dispatch = useDispatch();

  const formatTitle = (title) => {
    return title.length <= 14 ? title : title.substr(0, 22) + '...';
  };

  const sumPrice = () => {
    return (cartItem.price * cartItem.quantity).toFixed(2);
  };

  return (
    <li class="list-group-item d-flex justify-content-between lh-sm">
      <div className="d-flex align-items-center mb-2 ml-2" style={{ width: '20%', height: '13rem' }}>
        <img src={image} style={{ height: '100%', width: 'auto' }} alt={title} />
      </div>
      <div className="d-flex flex-column align-items-center justify-content-between w-100" style={{ fontSize: '2rem' }}>
        <div  data-bs-toggle="tooltip" data-bs-placement="top" title={title} style={{ fontWeight: 'bold', height: '3rem', overflow: 'hidden' }}>{formatTitle(title)}</div>
        <div>${sumPrice()}</div>
        {
          donNotShow ? <div>Quantity : {cartItem.quantity}</div> : <div className="d-flex align-items-center" style={{ gap: '3rem' }}>
            <Button
              onClick={() => dispatch(removeFromCart(product))}
              content={<FaMinus />}
              color="grey"
              animation="color"
            />
            <div>{cartItem.quantity}</div>
            <Button
              onClick={() => dispatch(addToCart(product))}
              content={<FaPlus />}
              color="grey"
              animation="color"
            />
          </div>
        }
      </div>
    </li>
  );
};

CardItemCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CardItemCard;
