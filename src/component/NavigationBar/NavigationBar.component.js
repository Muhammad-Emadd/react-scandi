import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import CategoryList from "../CategoryList";
import { NavLink, withRouter } from "react-router-dom";
import { logo } from "../../style/abstract/logos/exports";
import { connect } from "react-redux";

class NavigationBar extends PureComponent {
  render() {
    const { categories, currencies } = this.props;
    return (
      <div className="NavigationBar">
        <CategoryList categories={categories} />
        <NavLink id="Logo" to="/">
          <img src={logo} alt="Store Logo" />
        </NavLink>
      </div>
    );
  }
}
NavigationBar.propTypes = {
  categories: PropTypes.array.isRequired,
  currencies: PropTypes.array.isRequired,
};

const mapStateToProps = ({ categoryReducer, currenyReducer }) => {
  return {
    categories: categoryReducer.categories,
    currencies: currenyReducer.currencies,
  };
};

export default connect(mapStateToProps)(withRouter(NavigationBar));
