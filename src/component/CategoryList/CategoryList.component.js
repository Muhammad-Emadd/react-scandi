import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setCategory } from "../../store/categories";

class CategoryList extends PureComponent {
  componentDidMount() {
    this.props.handleCategory(this.props.categories[0]);
  }

  render() {
    const { categories, handleCategory, chosenCategory } = this.props;

    const listOfCategories = categories.map((category, index) => {
      return (
        <li key={category + index}>
          <NavLink
            onClick={() => handleCategory(category)}
            to={"/" + category}
            id={chosenCategory === category ? "y" : "n"}
          >
            {category}
          </NavLink>
          <div id={chosenCategory === category ? "Line" : "hide"} />
        </li>
      );
    });

    return <ul id="CategoryList">{listOfCategories}</ul>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleCategory: (category) => dispatch(setCategory(category)),
  };
};

const mapStateToProps = ({ categoryReducer }) => {
  return {
    categories: categoryReducer.categories,
    chosenCategory: categoryReducer.chosenCategory,
  };
};

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  chosenCategory: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
