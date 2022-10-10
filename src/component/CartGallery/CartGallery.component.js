import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class CartGallery extends PureComponent {
  changePreviewedImage = (index) => {
    this.setState({ previewedImage: index });
  };

  getGalleryList = (gallery) => {
    return gallery.map((imageURL, index) => {
      return (
        <div key={index} className="ProductGallery-Image">
          <img
            src={imageURL}
            alt={`Product ${index}`}
            onMouseOver={() => this.changePreviewedImage(index)}
          />
        </div>
      );
    });
  };

  render() {
    const { gallery } = this.props;
    const { previewedImage } = this.state;

    const galleryList = this.getGalleryList(gallery);

    return (
      <div className="ProductGallery">
        <div className="ProductGallery-List">{galleryList}</div>
        <div className="ProductGallery-Preview">
          <img src={gallery[previewedImage]} alt="Previewed" />
        </div>
      </div>
    );
  }
}

CartGallery.propTypes = {};

export default CartGallery;
