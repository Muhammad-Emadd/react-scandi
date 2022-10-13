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

class FiltersContainer extends PureComponent {
  handleExit = () => {
    const { setTransition, setIsOpen } = this.props;
    setTransition(true);
    setTimeout(() => {
      setIsOpen(false);
      setTransition(false);
    }, 500);
  };

  handleAttributes() {
    const { products, handleFilters } = this.props;
    const productAttributes = products.map((product) => {
      return { attributes: product.attributes };
    });
    onGettingFilters(allAttributes);
  }
  containerProps() {
    const {
      transitionExit,
      chosenCategory,
      categories,
      setCategory,
      attributes,
      handleFilters,
    } = this.props;

    return {
      transitionExit,
      chosenCategory,
      categories,
      setCategory,
      attributes,
      handleFilters,
    };
  }
  containerFunctions() {
    handleAttributes: this.handleAttributes.bind(this);
    handleExit: this.handleExit.bind(this);
  }
  render() {
    const { isOpen, transitionExit, setIsOpen } = this.props;
    const content = isOpen ? (
      <div className={`drawer_container ${transitionExit ? "exit" : ""}`}>
        <FiltersComponent
          {...this.containerProps()}
          {...this.containerFunctions}
        />
      </div>
    ) : null;

    return (
      <div className="sidebar_wrapper">
        <div className="sidebar_container">
          <button onMouseEnter={() => setIsOpen(true)}>open</button>
        </div>
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
    attributes: filtersReducer.attributes,
    transitionExit: filtersReducer.transitionExit,
  };
};

FiltersContainer.propTypes = {};
export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);
