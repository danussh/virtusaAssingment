import React from 'react';
import { Link } from 'react-router-dom';
import homepageImage from '../assets/images/homepage-image.png';
import underline from '../assets/images/underline.png';
import Button from '../components/elements/Button';
import routes from '../constants/routes.json';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-start">
          <div className="mb-2 text-uppercase font-weight-bold" style={{ color: '#777777', fontSize: '1.9rem', letterSpacing: '0.5rem' }}>
            Best online store of the year
          </div>
          <div className="font-weight-bold" style={{ fontSize: '6.4rem' }}>
            We don't do fashion, we are fashion
          </div>
          <img src={underline} alt="underline image" className="img-fluid d-none d-md-inline-block mt-n1 mb-3" style={{ width: '25rem' }} />
          <Link to={routes.PRODUCTS}>
            <Button content="Shop now" size="big" shape="round" color="dark" animation="scale" />
          </Link>
        </div>
        <div className="col-12 col-md-6 d-none d-md-flex justify-content-end">
          <img src={homepageImage} alt="people" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Home;
