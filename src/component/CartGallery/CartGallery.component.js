// import React, { PureComponent } from "react";
// import PropTypes from "prop-types";

// class CartGallery extends PureComponent {
//   state = { index: 0 };
//   changeUiImage = (index) => {
//     this.setState({ UiImage: index });
//   };
//   previousImage = () => {
//     const { gallery } = this.props;
//     this.setState(({ index }) => {
//       return { index: index - 1 > -1 ? --index : gallery.length - 1 };
//     });
//   };

//   nextImage = () => {
//     const { gallery } = this.props;
//     this.setState(({ index }) => {
//       return { index: gallery.length > index + 1 ? ++index : 0 };
//     });
//   };
//   getGalleryList = (gallery) => {
//     return gallery.map((imageURL, index) => {
//       return (
//         <div key={index} className="ProductGallery-Image">
//           <img
//             src={imageURL}
//             alt={`Product ${index}`}
//             onMouseOver={() => this.changeUiImage(index)}
//           />
//         </div>
//       );
//     });
//   };

//   render() {
//     const { gallery, type } = this.props;
//     const { index } = this.state;

//     return (
//       <div className="CartItemGallery">
//         <div className="ImagePreview">
//           <img src={gallery[index]} alt="Previewed" />
//         </div>
//         <button
//           className="Left"
//           disabled={gallery.length === 1}
//           onClick={this.previousImage.bind(this)}
//         >
//           <img src={CartGalleryArrow} alt="Left Arrow" />
//         </button>
//         <button
//           className="Right"
//           disabled={gallery.length === 1}
//           onClick={this.nextImage.bind(this)}
//         >
//           <img src={CartGalleryArrow} alt="Right Arrow" />
//         </button>
//       </div>
//     );
//   }
// }

// CartGallery.propTypes = {};

// export default CartGallery;

import React, { PureComponent } from "react";
import "./CartGallery.style.scss";
export default class CartGallery extends PureComponent {
  state = { activeImg: 0 };

  onChangingImg(e) {
    const { imagesLength } = this.props;
    const { activeImg } = this.state;
    const offset = e.target.getAttribute("button") === "next" ? 1 : -1;

    const newIndex = activeImg + offset;
    newIndex < 0 || newIndex > imagesLength - 1
      ? this.setState({ activeImg: 0 })
      : this.setState({ activeImg: newIndex });
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
          <img src={img} alt="Product Image" />
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
