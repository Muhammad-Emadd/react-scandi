import React, { PureComponent } from "react";
import {
  getFilters,
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
    const queryParameters = [
      ...new URLSearchParams(window.location.search).entries(),
    ];
    queryParameters.forEach(([filterKey, filterValue], i) => {
      const filter = this.state.filtersOn.filter(
        (filterObj) => filterObj[filterKey] === filterValue
      );
      if (filter.length === 0)
        this.setState((prevState) => ({
          filtersOn: [...prevState.filtersOn, { [filterKey]: filterValue }],
        }));
    });
  }

  updateQueryParams = () => {
    if (this.state.filtersOn.length === 0) {
      this.props.history.push({ search: "" });
    } else {
      const url = new URL(window.location);
      url.search = "";
      for (let i in this.state.filtersOn) {
        url.searchParams.append(
          Object.keys(this.state.filtersOn[i])[0],
          Object.values(this.state.filtersOn[i])[0]
        );
      }
      console.log(this.state.filtersOn);

      return url.search;
    }
  };
  setFilterss = ({ filterId, valueId }) => {
    const { history } = this.props;
    const index = this.state.filtersOn.findIndex(
      (filter) =>
        Object.keys(filter)[0] === filterId &&
        Object.values(filter)[0] === valueId
    );

    if (index >= 0) {
      this.setState(
        (prevState) => {
          return {
            filtersOn: prevState.filtersOn.filter((_, i) => i !== index),
          };
        },
        () => {
          history.push({ search: this.updateQueryParams() });
        }
      );
    } else {
      this.setState(
        (prevState, props) => ({
          filtersOn: [...prevState.filtersOn, { [filterId]: valueId }],
        }),
        () => {
          history.push({ search: this.updateQueryParams() });
        }
      );
    }
  };
  resetFilters = () => {
    const { history } = this.props;
    this.setState({ filtersOn: [] }, () => {
      history.push({ search: this.updateQueryParams() });
    });
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
    const { transitionExit, chosenCategory, filters, categories, setCategory } =
      this.props;
    const { filtersOn } = this.state;
    return {
      transitionExit,
      chosenCategory,
      categories,
      setCategory,
      filters,
      filtersOn,
    };
  }
  containerFunctions() {
    return {
      handleExit: this.handleExit.bind(this),
      setFilterss: this.setFilterss.bind(this),
      updateQueryParams: this.updateQueryParams.bind(this),
      resetFilters: this.resetFilters.bind(this),
    };
  }
  render() {
    const { isOpen, setIsOpen } = this.props;

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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FiltersContainer));
