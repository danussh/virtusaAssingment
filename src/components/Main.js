import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import routes from '../constants/routes.json';
import CheckoutPage from '../pages/CheckoutPage';

const Main = () => {
  return (
    <main className="container py-5">
      <Switch>
        <Redirect from="/" to={routes.HOME} exact />
        <Route exact path={routes.HOME} component={Home} />
        <Route exact path={routes.PRODUCTS} component={Products} />
        <Route exact path={routes.CHECKOUT} component={CheckoutPage} />
      </Switch>
    </main>
  );
};

export default Main;
