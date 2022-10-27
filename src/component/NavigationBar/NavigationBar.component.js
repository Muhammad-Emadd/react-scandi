import React, { PureComponent } from "react";
import CategoryList from "../CategoryList";
import { Link } from "react-router-dom";
import { logo } from "../../style/logos";
import CurrencyMenu from "../CurrencyMenu";
import "./NavigationBar.style.scss";
import CartMenu from "../CartMenu";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class NavigationBar extends PureComponent {
  render() {
    const { categories } = this.props;
    return (
      <div className="NavBar">
        <CategoryList />
        <Link className="NavBar-Logo" to={`/${categories[0]}`}>
          <img src={logo} alt="Store Logo" />
        </Link>
        <CurrencyMenu />
        <CartMenu />
      </div>
    );
  }
}

NavigationBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ categoryReducer }) => {
  return {
    categories: categoryReducer.categories,
  };
};
export default connect(mapStateToProps)(NavigationBar);
