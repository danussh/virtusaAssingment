import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './Products/ProductCard';
import { setProducts } from '../state/actions/products';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProducts = async () => {
    dispatch(setProducts(filterProducts(await fetchProducts())));
  };

  const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    let data = await response.json();
    return data;
  };

  const filterProducts = (products) => {
    return products.filter(
      (product) =>
        product.category === `men's clothing` ||
        product.category === `women's clothing`
    );
  };

  const productCards = products.map((product) => (
    <div key={uuidv4()} className="col-12 col-sm-6 col-lg-4 mb-4">
      <ProductCard
        id={product.id}
        title={product.title}
        price={product.price}
        image={product.image}
      />
    </div>
  ));

  return (
    <div className="container mt-4">
      <div className="row" style={{ animation: 'fadeIn ease 2s' }}>{productCards}</div>
    </div>
  );
};

export default Products;
