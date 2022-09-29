import React, { PureComponent } from "react";
import PropTypes from "prop-types";
export default class NavigationBar extends PureComponent {
  render() {
    const { categories, currencies } = this.props;
    return <div></div>;
  }
}
NavigationBar.propTypes = {
  categories: PropTypes.array.isRequired,
  currencies: PropTypes.array.isRequired,
};
