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
import { withRouter } from "react-router-dom";

class FiltersContainer extends PureComponent {
  state = { filtersOn: [] };
  componentDidMount() {
    const { products, onGettingFilters } = this.props;
    onGettingFilters(products);
  }

  updateQueryParams = () => {
    const queryParams = [];

    for (let i in this.state.filtersOn) {
      console.log(this.state.filtersOn[i]);

      queryParams.push(
        encodeURIComponent(Object.keys(this.state.filtersOn[i])[0]) +
          "=" +
          encodeURIComponent(Object.values(this.state.filtersOn[i])[0])
      );
    }

    const queryString = queryParams.join("&");
    this.props.history.push({ search: "?" + queryString });
  };
  componentDidUpdate(prevProps, { filtersOn }) {
    const { history } = this.props;
    if (filtersOn.length !== this.state.filtersOn.length) {
      this.updateQueryParams();
    }
  }
  setFilterss = ({ filterId, valueId }) => {
    console.log(filterId, valueId, this.state);

    const index = this.state.filtersOn.findIndex(
      (filter) =>
        Object.keys(filter)[0] === filterId &&
        filter[Object.keys(filter)[0]] === valueId
    );
    console.log(index >= 0);

    if (index >= 0) {
      this.setState((prevState, props) => ({
        filtersOn: prevState.filtersOn.splice(index, 1),
      }));
    } else {
      this.setState((prevState, props) => ({
        filtersOn: [...prevState.filtersOn, { [filterId]: valueId }],
      }));
    }
  };

  handleExit = () => {
    const { setTransition, setIsOpen } = this.props;
    setTransition(true);
    setTimeout(() => {
      setIsOpen(false);
      setTransition(false);
    }, 200);
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
      setFilterss: this.setFilterss.bind(this),
    };
  }
  render() {
    const { isOpen, setIsOpen } = this.props;

    console.log({ ...this.containerProps() }, { ...this.containerFunctions() });
    const arrowDirection = (
      <>
        <button
          className={
            !isOpen ? "SideBar-OpenButton" : "SideBar-OpenButton--Disabled"
          }
          onClick={() => setIsOpen(true)}
        >
          &raquo;
        </button>

        <button
          className={
            isOpen ? "SideBar-CloseButton" : "SideBar-CloseButton--Disabled"
          }
          onClick={() => this.handleExit()}
        >
          &laquo;
        </button>
      </>
    );

    const content = isOpen ? (
      <FiltersComponent
        {...this.containerProps()}
        {...this.containerFunctions()}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FiltersContainer));
