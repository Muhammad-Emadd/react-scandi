import React, { PureComponent } from "react";
import CategoryList from "../CategoryList";
import { NavLink, withRouter } from "react-router-dom";
import { logo } from "../../style/logos";
import CurrencyMenu from "../CurrencyMenu";

class NavigationBar extends PureComponent {
  render() {
    return (
      <div className="NavBar">
        <CategoryList />
        <NavLink className="NavBar-Logo" to="/">
          <img src={logo} alt="Store Logo" />
        </NavLink>
        <CurrencyMenu />
      </div>
    );
  }
}

export default withRouter(NavigationBar);
