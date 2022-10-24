import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class FiltersComponent extends PureComponent {
  render() {
    const { handleExit, transitionExit, filters, handleFilters } = this.props;
    const filtersKeysAndValues = Object.entries(filters).map(
      ([key, value], index) => {
        const colorType = key === "Color";
        return (
          <div key={key + index} className="FiltersWrapper">
            <h2>{key}</h2>
            <div
              className={
                colorType ? "FiltersWrapper-Swatch" : "FiltersWrapper-Text"
              }
            >
              {value.map((object, i) => {
                return colorType ? (
                  <div
                    key={object.id + i}
                    onClick={() =>
                      handleFilters({ filterId: key, value: object })
                    }
                    className={
                      object.active
                        ? "FiltersWrapper-SelectedSwatch"
                        : "FiltersWrapper-Swatch"
                    }
                    style={{
                      backgroundColor: object.value,
                    }}
                  ></div>
                ) : (
                  <div
                    key={object.id + i}
                    onClick={() =>
                      handleFilters({ filterId: key, value: object })
                    }
                    className={
                      object.active
                        ? "FiltersWrapper-SelectedText"
                        : "FiltersWrapper-Text"
                    }
                  >
                    {object.value}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    );

    return (
      <div
        onClick={handleExit}
        className={`drawer ${transitionExit ? "exit" : ""}`}
      >
        {filtersKeysAndValues}
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
