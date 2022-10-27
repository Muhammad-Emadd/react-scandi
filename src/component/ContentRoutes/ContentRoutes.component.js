import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import ProductListPage from "../../route/ProductListPage";
import CartPage from "../../route/CartPage";
import ProductPage from "../../route/ProductPage";
import "./ContentRoutes.style.scss";

class ContentRoutes extends PureComponent {
  render() {
    const { overlay, categoryRoutes } = this.props;
    const navBarRoutesSearch = categoryRoutes.map((category, index) => {
      return (
        <Route key={index + category} path={`/${category}:id`}>
          <ProductListPage />
        </Route>
      );
    });
    const navBarRoutes = categoryRoutes.map((category, index) => {
      return (
        <Route key={index + category} path={`/${category}`}>
          <ProductListPage />
        </Route>
      );
    });

    return (
      <div className="AppBody">
        <div
          className={overlay ? "AppBody-Overlay" : "AppBody-Overlay--Hidden"}
        />
        <Switch>
          <Route exact path="/">
            <ProductListPage />
          </Route>
          {navBarRoutes}
          {navBarRoutesSearch}
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/products/:product_id">
            <ProductPage />
          </Route>
        </Switch>
      </div>
    );
  }
}

ContentRoutes.propTypes = {
  overlay: PropTypes.bool.isRequired,
  categoryRoutes: PropTypes.array.isRequired,
};

const mapStateToProps = ({ categoryReducer, overlayReducer }) => {
  return {
    categoryRoutes: categoryReducer.categories,
    overlay: overlayReducer.overlay,
  };
};

export default connect(mapStateToProps)(withRouter(ContentRoutes));
