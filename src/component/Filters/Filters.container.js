import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  getFilters,
  setFilter,
  setIsOpen,
  setTransition,
} from "../../store/filters/filtersSlice";
import { setCategory } from "../../store/categories/categoriesSlice";
import FiltersComponent from "./Filters.component";
import { connect } from "react-redux";
import "./Filters.style.scss";

class FiltersContainer extends PureComponent {
  componentDidMount() {
    const { products, onGettingFilters } = this.props;
    onGettingFilters(products);
  }
  handleExit = () => {
    const { setTransition, setIsOpen } = this.props;
    setTransition(true);
    setTimeout(() => {
      setIsOpen(false);
      setTransition(false);
    }, 500);
  };

  containerProps() {
    const {
      transitionExit,
      chosenCategory,
      categories,
      setCategory,
      filters,
      handleFilters,
    } = this.props;

    return {
      transitionExit,
      chosenCategory,
      categories,
      setCategory,
      filters,
      handleFilters,
    };
  }
  containerFunctions() {
    return {
      handleExit: this.handleExit.bind(this),
    };
  }
  render() {
    const { isOpen, transitionExit, setIsOpen } = this.props;

    console.log({ ...this.containerProps() }, { ...this.containerFunctions() });
    const arrowDirection = isOpen ? (
      <button className="SideBar-Button " onClick={() => setIsOpen(!isOpen)}>
        &raquo;
      </button>
    ) : (
      <button className="SideBar-Button " onClick={() => setIsOpen(!isOpen)}>
        &laquo;
      </button>
    );

    const content = isOpen ? (
      <div
        className={
          transitionExit ? `FiltersContainer-Open` : "FiltersContainer-Closed"
        }
      >
        <FiltersComponent
          {...this.containerProps()}
          {...this.containerFunctions}
        />
      </div>
    ) : null;

    return (
      <div className="SideBar">
        <div className="SideBar_Container">{arrowDirection}</div>
        {content}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onGettingFilters: (attributes) => dispatch(getFilters(attributes)),
    handleFilters: (attributes) => dispatch(setFilter(attributes)),
    setIsOpen: (bool) => dispatch(setIsOpen(bool)),
    setTransition: (bool) => dispatch(setTransition(bool)),
    setCategory: (cat) => dispatch(setCategory(cat)),
  };
};

const mapStateToProps = ({
  categoryReducer,
  productsReducer,
  filtersReducer,
}) => {
  return {
    chosenCategory: categoryReducer.chosenCategory,
    categories: categoryReducer.categories,
    products: productsReducer.products,
    isOpen: filtersReducer.isOpen,
    filters: filtersReducer.filters,
    transitionExit: filtersReducer.transitionExit,
  };
};

FiltersContainer.propTypes = {};
export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);
