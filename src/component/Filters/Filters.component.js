import React, { PureComponent } from "react";
import { COLOR } from "../../util/constants";
import "./Filters.style.scss";


class FiltersComponent extends PureComponent {
  render() {
    const {
      transitionExit,
      filters,
      filtersOn,
      setFilterss,
      chosenCategory,
      resetFilters,
    } = this.props;

    const filtersKeysAndValues = Object.entries(filters).map(
      ([key, value], index) => {
        const colorType = key === COLOR;
        return (
          <div key={key + index} className="FiltersWrapper">
            <h2>{key}</h2>
            <div className="FiltersWrapper-Att">
              {value.map((object, i) => {
                return colorType ? (
                  <div
                    key={object.id + i}
                    onClick={() =>
                      setFilterss({ filterId: key, valueId: object.id })
                    }
                    className={
                      filtersOn.some(
                        (filterOn) =>
                          Object.values(filterOn)[0] === object.displayValue
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
                      setFilterss({ filterId: key, valueId: object.id })
                    }
                    className={
                      filtersOn.some(
                        (filterOn) =>
                          Object.values(filterOn)[0] === object.displayValue &&
                          Object.keys(filterOn)[0] === key
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
        <button
          onClick={() => resetFilters()}
          to={{
            pathname: `/${chosenCategory}`,
            search: "",
          }}
        >
          Reset
        </button>
      </div>
    );
  }
}

FiltersComponent.propTypes = {};

export default FiltersComponent;
