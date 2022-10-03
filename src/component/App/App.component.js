import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getCategoriesAndCurrencies } from "../../query/Categ_Curr.query";
import { getCategories, setErrorFetchingCat } from "../../store/categories";
import { getCurrencies, setErrorFetchingCurr } from "../../store/currencies";
import { ERROR, IDLE } from "../../util/constants";
import ContentRoutes from "../ContentRoutes";
import NavigationBar from "../NavigationBar/NavigationBar.component";

class App extends PureComponent {
  componentDidMount() {
    getCategoriesAndCurrencies()
      .then((results) => {
        this.props.onInitCategories(
          results["categories"].map((value) => value.name)
        );
        this.props.onInitCurrencies(
          results["currencies"].map((value) => value)
        );
      })
      .catch((error) => {
        this.props.onFetchCategoriesFail(ERROR);
        this.props.onFetchCurrenciesFail(ERROR);
      });
  }

  render() {
    const { currenciesStatus, categoriesStatus } = this.props;

    const content =
      currenciesStatus === IDLE && categoriesStatus === IDLE ? (
        <div id="App">
          <NavigationBar />
          <ContentRoutes />
        </div>
      ) : currenciesStatus === ERROR && categoriesStatus === ERROR ? (
        <h2>something went wrong...</h2>
      ) : (
        <h2>Loading...</h2>
      );

    return <div className="App">{content}</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInitCategories: (cat) => dispatch(getCategories(cat)),
    onFetchCategoriesFail: (err) => dispatch(setErrorFetchingCat(err)),
    onInitCurrencies: (cat) => dispatch(getCurrencies(cat)),
    onFetchCurrenciesFail: (err) => dispatch(setErrorFetchingCurr(err)),
  };
};
const mapStateToProps = ({ categoryReducer, currenyReducer }) => {
  return {
    currenciesStatus: currenyReducer.currenciesStatus,
    categoriesStatus: categoryReducer.categoriesStatus,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
