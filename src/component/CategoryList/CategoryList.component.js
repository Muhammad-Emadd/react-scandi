import React, { PureComponent } from "react";
import { NavLink, withRouter } from "react-router-dom";

class CategoryList extends PureComponent {
  render() {
    const {
      categories,
      location: { pathname },
    } = this.props;
    console.log(this.props);

    const listOfCategories = categories.map((category, index) => {
      const selected =
        pathname === "/" + category || (!index && pathname === "/");
      return (
        <li key={category + index}>
          <NavLink
            to={"/" + category}
            id={selected ? "SelectedCategorey" : "Category"}
          >
            {category}
          </NavLink>
          <div id={selected ? "CategoryLine" : "Deactivate"} />
        </li>
      );
    });

    return <ul id="CategoryList">{listOfCategories}</ul>;
  }
}

export default withRouter(CategoryList);
