import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { upArrow } from "../../style/logos";
import { downArrow } from "../../style/logos";
import { setCurrency, toggleCurrencyMenu } from "../../store/currencies";
import { connect } from "react-redux";

class CurrencyMenu extends PureComponent {
  componentDidMount() {
    this.props.handleCurrency(this.props.currencies[0]);
  }

  render() {
    const {
      handleCurrency,
      currencies,
      showCurrencyMenu,
      chosenCurrency,
      handleToggleMenu,
    } = this.props;

    const selected = chosenCurrency ? chosenCurrency : "";

    const listOfCurrency = currencies.map((currency, index) => {
      return (
        <li
          key={index + currency.label}
          onClick={() => handleCurrency(currency)}
        >
          {currency.symbol + " " + currency.label}
        </li>
      );
    });

    return (
      <div onMouseLeave={handleToggleMenu}>
        <button onClick={handleToggleMenu}>
          {selected.symbol + " " + selected.label + " "}
          <img src={showCurrencyMenu ? upArrow : downArrow} alt="Arrow" />
        </button>
        {showCurrencyMenu ? <ul>{listOfCurrency}</ul> : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggleMenu: () => dispatch(toggleCurrencyMenu()),
    handleCurrency: (currency) => dispatch(setCurrency(currency)),
  };
};
const mapStateToProps = ({ currenyReducer }) => {
  return {
    currencies: currenyReducer.currencies,
    showCurrencyMenu: currenyReducer.showCurrencyMenu,
    chosenCurrency: currenyReducer.chosenCurrency,
  };
};
CurrencyMenu.propTypes = { currencies: PropTypes.array.isRequired };

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyMenu);
