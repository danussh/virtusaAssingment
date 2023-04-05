import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '../../components/elements/Button';
import { addToCart } from '../../state/actions/cart';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductCard = ({ id, title, price, image, category }) => {
  const product = { id, title, price, image, category };
  const dispatch = useDispatch();

  return (
    <div className="d-flex flex-column border rounded p-2 bg-white" style={{ fontSize: '2rem' }}>
      <div className="img-container p-3" style={{ height: '25rem', margin: '0 auto' }}>
        <img src={image} alt={title} className="img-fluid h-100" />
      </div>
      <div className="d-flex flex-column justify-content-between" style={{ borderTop: '1px solid #ccc', padding: '2rem' }}>
        <div className="info d-flex flex-column justify-content-between" style={{ gap: '1rem', height: '100%' }}>
          <div className="font-weight-bold">{title}</div>
          <div>${price.toFixed(2)}</div>
        </div>
        <Button
          onClick={() => dispatch(addToCart(product))}
          content="Add to cart"
          size="wide"
          color="dark"
          animation="color"
        />
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string,
};

export default ProductCard;
