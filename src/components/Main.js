import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import routes from '../constants/routes.json';
import CheckoutPage from '../pages/CheckoutPage';
import ReviewPage from '../pages/ReviewPage';

const Main = () => {
  return (
    <main className="container py-5">
      <Switch>
        <Redirect from="/" to={routes.HOME} exact />
        <Route exact path={routes.HOME} component={Home} />
        <Route exact path={routes.PRODUCTS} component={Products} />
        <Route exact path={routes.CHECKOUT} component={CheckoutPage} />
        <Route exact path={routes.REVIEW} component={ReviewPage} />
      </Switch>
    </main>
  );
};

export default Main;
