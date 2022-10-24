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
      filtersOn,
    } = this.props;

    return {
      transitionExit,
      chosenCategory,
      categories,
      setCategory,
      filters,
      handleFilters,
      filtersOn,
    };
  }
  containerFunctions() {
    return {
      handleExit: this.handleExit.bind(this),
    };
  }
  render() {
    const { isOpen, setIsOpen } = this.props;

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
      <FiltersComponent
        {...this.containerProps()}
        {...this.containerFunctions}
      />
    ) : null;

    return (
      <div className="SideBar">
        <div className="SideBar_ArrowContainer ">{arrowDirection}</div>
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
    filtersOn: filtersReducer.filtersOn,
    transitionExit: filtersReducer.transitionExit,
  };
};

FiltersContainer.propTypes = {};
export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);
