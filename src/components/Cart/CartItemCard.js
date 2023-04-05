import React from 'react';
import PropTypes from 'prop-types';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Button from '../elements/Button';
import { addToCart, removeFromCart } from '../../state/actions';

const CardItemCard = ({ id, title, price, image, quantity }) => {
  const cartItem = { id, title, price, image, quantity };
  const product = { id, title, price, image };
  const dispatch = useDispatch();

  const formatTitle = (title) => {
    return title.length <= 14 ? title : title.substr(0, 14) + '...';
  };

  const sumPrice = () => {
    return (cartItem.price * cartItem.quantity).toFixed(2);
  };

  return (
    <div className="d-flex">
      <div className="d-flex align-items-center" style={{ width: '20%', height: '13rem' }}>
        <img src={image} style={{ height: '100%', width: 'auto' }} alt={title} />
      </div>
      <div className="d-flex flex-column align-items-center justify-content-between w-100" style={{ fontSize: '2rem' }}>
        <div style={{ fontWeight: 'bold', height: '3rem', overflow: 'hidden' }}>{formatTitle(title)}</div>
        <div>${sumPrice()}</div>
        <div className="d-flex align-items-center" style={{ gap: '3rem' }}>
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
      </div>
    </div>
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
