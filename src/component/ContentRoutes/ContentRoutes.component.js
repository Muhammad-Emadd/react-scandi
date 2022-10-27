import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import ProductListPage from "../../route/ProductListPage";
import CartPage from "../../route/CartPage";
import ProductPage from "../../route/ProductPage";
import "./ContentRoutes.style.scss";
import Filters from "../Filters";
import { IDLE } from "../../util/constants";

class ContentRoutes extends PureComponent {
  render() {
    const { overlay, categoryRoutes, productsStatus } = this.props;
    const navBarRoutesSearch = categoryRoutes.map((category, index) => {
      console.log(`/${category}`);

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
    const filters = productsStatus === IDLE ? <Filters /> : null;
    console.log(this.props);

    return (
      <div className="AppBody">
        <div
          className={overlay ? "AppBody-Overlay" : "AppBody-Overlay--Hidden"}
        />
        {filters}

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
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

ContentRoutes.propTypes = {
  overlay: PropTypes.bool,
  categoryRoutes: PropTypes.array.isRequired,
};

const mapStateToProps = ({
  categoryReducer,
  overlayReducer,
  productsReducer,
}) => {
  return {
    productsStatus: productsReducer.productsStatus,
    categoryRoutes: categoryReducer.categories,
    overlay: overlayReducer.overlay,
  };
};

export default connect(mapStateToProps)(withRouter(ContentRoutes));

function NotFound() {
  return (
    <div>
      <h1>
        You have landed on a page that doesn't exist You have landed on a page
        that doesn't exist
      </h1>
      <h1>
        You have landed on a page that doesn't exist You have landed on a page
        that doesn't exist
      </h1>
      <h1>
        You have landed on a page that doesn't exist You have landed on a page
        that doesn't exist
      </h1>
      <h1>
        You have landed on a page that doesn't exist You have landed on a page
        that doesn't exist
      </h1>
    </div>
  );
}
