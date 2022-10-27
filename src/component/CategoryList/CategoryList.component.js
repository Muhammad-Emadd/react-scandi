import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setCategory } from "../../store/categories";
import "./CategoryList.style.scss";
class CategoryList extends PureComponent {
  componentDidMount() {
    if (this.props.chosenCategory === null)
      this.props.handleCategory(this.props.categories[0]);
  }

  render() {
    const { categories, handleCategory, chosenCategory } = this.props;

    const listOfCategories = categories.map((category, index) => {
      return (
        <li className="CategoryList-Item" key={category + index}>
          <NavLink
            onClick={() => handleCategory(category)}
            to={`/${category}`}
            className={
              chosenCategory === category ? "CategoryList-Item--chosen" : ""
            }
          >
            {category.toUpperCase()}
          </NavLink>
          <div
            className={
              chosenCategory === category
                ? "CategoryList-Line"
                : "CategoryList-Line--hide"
            }
          />
        </li>
      );
    });

    return <ul className="CategoryList">{listOfCategories}</ul>;
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
