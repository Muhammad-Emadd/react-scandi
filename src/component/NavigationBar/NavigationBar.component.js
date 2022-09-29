import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import CategoryList from "../CategoryList";
import { withRouter } from "react-router-dom";
class NavigationBar extends PureComponent {
  render() {
    const { categories, currencies } = this.props;
    return (
      <div className="NavigationBar">
        <CategoryList categories={categories} />
      </div>
    );
  }
}
NavigationBar.propTypes = {
  categories: PropTypes.array.isRequired,
  currencies: PropTypes.array.isRequired,
};
export default withRouter(NavigationBar);
