import React, { PureComponent } from "react";
import { getCategoriesAndCurrencies } from "../../query/Categ_Curr.query";
import NavigationBar from "../NavigationBar/NavigationBar.component";

import React, { PureComponent } from "react";

export default class App extends PureComponent {
  state = { categories: [], currencies: [] };
  componentDidMount() {
    const abortController = new AbortController(); // creating an AbortController

    getCategoriesAndCurrencies(abortController) // passing the signal to the query
      .then((results) =>
        this.setState(() => ({
          categories: results["categories"].map((value) => value.name),
          currencies: results["currencies"].map((value) => value.label),
        }))
      )
      .catch((error) => {
        if (error.name === "AbortError") return; // if the query has been aborted, do nothing
        throw error;
      });

    abortController.abort();
  }

  render() {
    const { categories, currencies } = this.state;

    const content =
      categories.length && currencies.length ? (
        <div id="App">
          <NavigationBar categories={categories} currencies={currencies} />
        </div>
      ) : (
        <h1>Loading...</h1>
      );
    return <div className="App">{content}</div>;
  }
}
