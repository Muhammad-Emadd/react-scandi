import React, { PureComponent } from "react";
import CategoryList from "../CategoryList";
import { NavLink, withRouter } from "react-router-dom";
import { logo } from "../../style/logos";
import CurrencyMenu from "../CurrencyMenu";
import "./NavigationBar.style.scss";
import CartMenuComponent from "../CartMenu/CartMenu.component";
import CartMenu from "../CartMenu";
import { connect } from "react-redux";
class NavigationBar extends PureComponent {
  render() {
    const { categories } = this.props;
    return (
      <div className="NavBar">
        <CategoryList />
        <NavLink className="NavBar-Logo" to={`/${categories[0]}`}>
          <img src={logo} alt="Store Logo" />
        </NavLink>
        <CurrencyMenu />
        <CartMenu />
      </div>
    );
  }
}
const mapStateToProps = ({ categoryReducer }) => {
  return {
    categories: categoryReducer.categories,
  };
};
export default connect(mapStateToProps)(withRouter(NavigationBar));
