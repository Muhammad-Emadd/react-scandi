import React, { PureComponent } from "react";
import CategoryList from "../CategoryList";
import { NavLink, withRouter } from "react-router-dom";
import { logo } from "../../style/logos";
import CurrencyMenu from "../CurrencyMenu";

class NavigationBar extends PureComponent {
  render() {
    console.log(this.props);

    return (
      <div className="NavigationBar">
        <CategoryList />
        <NavLink id="Logo" to="/">
          <img src={logo} alt="Store Logo" />
        </NavLink>
        <CurrencyMenu />
      </div>
    );
  }
}

export default withRouter(NavigationBar);
