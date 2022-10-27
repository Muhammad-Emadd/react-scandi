import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./CartGallery.style.scss";
export default class CartGallery extends PureComponent {
  state = { activeImg: 0 };

  onChangingImg(e) {
    const { gallery } = this.props;
    const { activeImg } = this.state;
    const offset = e.target.getAttribute("button") === "next" ? 1 : -1;

    const newIndex = activeImg + offset;
    newIndex < 0
      ? this.setState({ activeImg: 0 })
      : this.setState({ activeImg: newIndex % gallery.length });
  }
  render() {
    const { gallery } = this.props;
    const galleryList = gallery.map((img, i) => {
      return (
        <li
          key={i + img}
          className={
            this.state.activeImg === i
              ? "Carousel-Img"
              : "Carousel-Img--Hidden "
          }
        >
          <img src={img} alt="Product" />
        </li>
      );
    });
    return (
      <div className="Carousel">
        <button
          className="Carousel-PrevButton "
          onClick={this.onChangingImg.bind(this)}
          button="prev"
        >
          &#8249;
        </button>
        <button
          className="Carousel-NextButton "
          onClick={this.onChangingImg.bind(this)}
          button="next"
        >
          &#8250;
        </button>
        <ul className="Carousel-List" data-slides>
          {galleryList}
        </ul>
      </div>
    );
  }
}

CartGallery.prototypes = {
  gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
};
