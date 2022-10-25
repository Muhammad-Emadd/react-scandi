import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { COLOR } from "../../util/constants";
import "./Filters.style.scss";

class FiltersComponent extends PureComponent {
  render() {
    const { transitionExit, filters, handleFilters, filtersOn, setFilterss } =
      this.props;
    console.log(this.props);

    const filtersKeysAndValues = Object.entries(filters).map(
      ([key, value], index) => {
        const colorType = key === COLOR;
        return (
          <div key={key + index} className="Drawer-FiltersWrapper">
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
                    onClick={() => handleFilters({ key, object })}
                    className={
                      filtersOn.some(
                        (filterOn) => filterOn.value.value === object.value
                      )
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
                      // handleFilters({ filterId: key, value: object })
                      setFilterss({ filterId: key, valueId: object.id })
                    }
                    className={
                      filtersOn.some(
                        (filterOn) => filterOn.value.value === object.value
                      )
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
      <div className={`Drawer ${transitionExit ? "exit" : ""}`}>
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
