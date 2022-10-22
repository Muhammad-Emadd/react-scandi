import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class FiltersComponent extends PureComponent {
  render() {
    const { handleExit, transitionExit, filters } = this.props;
    const filtersKeys = Object.keys(filters).map((key, i) => {});
    console.log(filtersKeys);

    return (
      <div
        onClick={handleExit}
        className={`drawer ${transitionExit ? "exit" : ""}`}
      >
        <p>Home</p>
        <p>About</p>
        <p>Contact</p>
      </div>
    );
  }
}

FiltersComponent.propTypes = {};

export default FiltersComponent;

const Drawer = ({ transitionExit, handleExit }) => (
  <div
    onClick={handleExit}
    className={`drawer ${transitionExit ? "exit" : ""}`}
  >
    <p>Home</p>
    <p>About</p>
    <p>Contact</p>
    <button>Close Drawer</button>
  </div>
);
