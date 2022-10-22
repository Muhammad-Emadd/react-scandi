import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProductListAPI } from "../../query/ProductList.query";
import ProductItem from "../../component/ProductItem";
import Filters from "../../component/Filters";
import { ERROR } from "../../util/constants";
import { getProducts, onErrorGettingProducts } from "../../store/products";
import { withRouter } from "react-router-dom";
import { setCategory } from "../../store/categories";
import "./ProductList.style.scss";

class ProductList extends PureComponent {
  componentDidMount() {
    const { onInitProducts, onFetchProductsFail } = this.props;

    const category = this.getUrl();

    getProductListAPI(category)
      .then((results) => onInitProducts(results.category.products))
      .catch((error) => onFetchProductsFail(ERROR));
  }
  getUrl = () => {
    const {
      handleCategory,
      match: { path },
      chosenCategory,
    } = this.props;

    if (path.substring(1).length > 0) {
      handleCategory(path.substring(1));
      return path.substring(1);
    } else return chosenCategory;
  };

  checkForFilteres = (product) => {
    //   [ {  key: "", value:''  }, {  key: "", value:''  } ]
    // const filters = this.props;
    const filters = [];
    return filters.every(({ key, valueAction }) => {
      product.attributes
        .find((attribute) => attribute.id === key)
        ?.items.some((value) => value.id === valueAction);
    })
      ? true
      : false;
  };
  filteredProducts = () => {
    const { products, chosenCurrency } = this.props;

    const checkForFilteres = this.checkForFilteres.bind(this);
    const newProductArray = products.reduce(function (newArr, product, index) {
      checkForFilteres(product) &&
        newArr.push(
          <ProductItem key={index + product.id} product={{ ...product }} />
        );

      return newArr;
    }, []);

    return newProductArray;
  };

  render() {
    const { chosenCategory, products } = this.props;
    const chosenCategoryUi =
      chosenCategory.charAt(0).toUpperCase() + chosenCategory.slice(1);

    console.log(chosenCategory);

    const productsList = products.length
      ? this.filteredProducts(products)
      : null;
    console.log(products.length);

    const filters = products.length ? <Filters /> : null;
    return (
      <div className="ProductList">
        {filters}
        <h1 className="ProductList-Category">{chosenCategoryUi}</h1>
        <div className="ProductList-Body">{productsList}</div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onInitProducts: (Products) => dispatch(getProducts(Products)),
    onFetchProductsFail: (err) => dispatch(onErrorGettingProducts(err)),
    handleCategory: (cat) => dispatch(setCategory(cat)),
  };
};

const mapStateToProps = ({
  categoryReducer,
  productsReducer,
  currenyReducer,
}) => {
  return {
    chosenCategory: categoryReducer.chosenCategory,
    products: productsReducer.products,
    chosenCurrency: currenyReducer.chosenCurrency,
  };
};
ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  chosenCategory: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductList));
