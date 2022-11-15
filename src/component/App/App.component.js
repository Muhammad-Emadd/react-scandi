import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategoriesAndCurrencies } from "../../query/Categ_Curr.query";
import {
  getCategories,
  setCategory,
  setErrorFetchingCat,
} from "../../store/categories";
import { getCurrencies, setErrorFetchingCurr } from "../../store/currencies";
import { ERROR, IDLE } from "../../util/constants";
import ContentRoutes from "../ContentRoutes";
import NavigationBar from "../NavigationBar/NavigationBar.component";
import "./App.style.scss";

class App extends PureComponent {
  componentDidMount() {
    const {
      chosenCategory,
      onInitCategories,
      onFetchCategoriesFail,
      onInitCurrencies,
      onFetchCurrenciesFail,
      handleDefaultCat,
    } = this.props;
    if (chosenCategory === null) {
      getCategoriesAndCurrencies()
        .then((results) => {
          onInitCategories(results["categories"].map((value) => value.name));
          handleDefaultCat(results["categories"][0].name);
          onInitCurrencies(results["currencies"].map((value) => value));
        })
        .catch(() => {
          onFetchCategoriesFail(ERROR);
          onFetchCurrenciesFail(ERROR);
        });
    }
  }

  render() {
    const { currenciesStatus, categoriesStatus } = this.props;

    const content =
      currenciesStatus === IDLE && categoriesStatus === IDLE ? (
        <>
          <NavigationBar />
          <ContentRoutes />
        </>
      ) : currenciesStatus === ERROR && categoriesStatus === ERROR ? (
        <h2>something went wrong...</h2>
      ) : (
        <h2>Loading...</h2>
      );

    return <div className="App">{content}</div>;
  }
}

App.propTypes = {
  categoriesStatus: PropTypes.string.isRequired,
  chosenCategory: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitCategories: (cats) => dispatch(getCategories(cats)),
    onFetchCategoriesFail: (err) => dispatch(setErrorFetchingCat(err)),
    handleDefaultCat: (cat) => dispatch(setCategory(cat)),
    onInitCurrencies: (curr) => dispatch(getCurrencies(curr)),
    onFetchCurrenciesFail: (err) => dispatch(setErrorFetchingCurr(err)),
  };
};
const mapStateToProps = ({ categoryReducer, currenyReducer }) => {
  return {
    chosenCategory: categoryReducer.chosenCategory,
    currenciesStatus: currenyReducer.currenciesStatus,
    categoriesStatus: categoryReducer.categoriesStatus,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
