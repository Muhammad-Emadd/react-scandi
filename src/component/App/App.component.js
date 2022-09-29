import React, { PureComponent } from "react";
import { getCategoriesAndCurrencies } from "../../query/Categ_Curr.query";
import NavigationBar from "../NavigationBar/NavigationBar.component";

export default class App extends PureComponent {
  state = {
    categories: [],
    currencies: [],
    dataWasFetched: false,
    error: null,
  };
  componentDidMount() {
    const { dataWasFetched } = this.state;
    if (!dataWasFetched) {
      const abortController = new AbortController(); // creating an AbortController
      getCategoriesAndCurrencies(abortController) // passing the signal to the query
        .then(
          (results) => {
            this.setState(() => ({
              categories: results["categories"].map((value) => value.name),
              currencies: results["currencies"].map((value) => value.label),
              dataWasFetched: true,
            }));
          },
          (error) => {
            this.setState({
              dataWasFetched: false,
              error,
            });
          }
        )
        .catch((error) => {
          if (error.name === "AbortError") return; // if the query has been aborted, do nothing
          throw error;
        });
      abortController.abort();
    }
  }

  render() {
    const { categories, currencies, dataWasFetched, error } = this.state;
    console.log(dataWasFetched, currencies);

    const content = dataWasFetched ? (
      <div id="App">
        <NavigationBar categories={categories} currencies={currencies} />
      </div>
    ) : error ? (
      <h1>something went wrong...</h1>
    ) : (
      <h1>Loading...</h1>
    );
    return <div className="App">{content}</div>;
  }
}
