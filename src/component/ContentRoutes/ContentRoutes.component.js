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
    const navBarRoutes = categoryRoutes.map((category, index) => {
      return (
        <Route key={index + category} path={`/${category}:id`}>
          <ProductListPage />
        </Route>
      );
    });
    const filters = productsStatus === IDLE ? <Filters /> : null;
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
