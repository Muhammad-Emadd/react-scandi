import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { upArrow } from "../../style/logos";
import { downArrow } from "../../style/logos";
import { setCurrency, toggleCurrencyMenu } from "../../store/currencies";
import { connect } from "react-redux";
import "./CurrencyMenu.style.scss";
import { withRouter } from "react-router-dom";
class CurrencyMenu extends PureComponent {
  state = { chosenCurrency: null };
  componentDidMount() {
    this.props.handleCurrency(this.props.currencies[0]);
    this.setState({ chosenCurrency: this.props.currencies[0] });
  }

  changeCurrency = (currency) => {
    this.props.handleCurrency(currency);
    this.setState({ chosenCurrency: currency });
  };
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
          className="CurrencyMenu-Item"
          key={index + currency.label}
          onClick={() => handleCurrency(currency)}
        >
          {currency.symbol + " " + currency.label}
        </li>
      );
    });

    return (
      <div
        className="CurrencyMenu"
        onMouseLeave={() => handleToggleMenu(false)}
      >
        <div
          className="CurrencyMenu-Button"
          onClick={() => handleToggleMenu(true)}
        >
          <p> {selected.symbol}</p>
          <img src={showCurrencyMenu ? upArrow : downArrow} alt="Arrow" />
        </div>
        {showCurrencyMenu ? (
          <ul className="CurrencyMenu-List">{listOfCurrency}</ul>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggleMenu: (bool) => dispatch(toggleCurrencyMenu(bool)),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CurrencyMenu));
