import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import ProductList from "../../route/ProductList";
import Cart from "../../route/Cart";
import Product from "../../route/Product";
import "./ContentRoutes.style.scss";

class ContentRoutes extends PureComponent {
  render() {
    const { overlay, categoryRoutes } = this.props;
    const navBarRoutes = categoryRoutes.map((category, index) => {
      return (
        <Route key={index + category} path={`/${category}`}>
          <ProductList />
        </Route>
      );
    });

    return (
      <div className="AppBody">
        <div
        // id={overlay ? "BodyOverlay" : "Deactivate"}
        />
        <Switch>
          <Route exact path="/">
            <ProductList />
          </Route>
          {navBarRoutes}
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/products/:product_id">
            <Product />
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

const mapStateToProps = ({ categoryReducer, overlayReducer }) => {
  return {
    categoryRoutes: categoryReducer.categories,
    overlay: overlayReducer.overlay,
  };
};

export default connect(mapStateToProps)(withRouter(ContentRoutes));
