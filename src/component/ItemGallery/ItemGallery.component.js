import React, { PureComponent } from "react";
import "./ItemGallery.style.scss";

class ProductGallery extends PureComponent {
  state = { imageIndex: 0 };

  handleErrorImg = (event) => {
    event.currentTarget.parentNode.style.display = "none";
  };

  changePreviewedImage = (index) => {
    this.setState({ imageIndex: index });
  };

  getGalleryList = (gallery) => {
    return gallery.map((imageURL, index) => {
      return (
        <div key={index} className="ItemGallery-ListImage">
          <img
            src={imageURL}
            alt={`Product ${index}`}
            onError={this.handleErrorImg}
            onMouseOver={() => this.changePreviewedImage(index)}
          />
        </div>
      );
    });
  };

  render() {
    const { gallery } = this.props;
    const { imageIndex } = this.state;

    const listOfImages = this.getGalleryList(gallery);

    return (
      <div className="ItemGallery">
        <div className="ItemGallery-List">{listOfImages}</div>
        <div className="ItemGallery-Preview">
          <img src={gallery[imageIndex]} alt="Previewed" />
        </div>
      </div>
    );
  }
}

export default ProductGallery;
