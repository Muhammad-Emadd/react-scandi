import React, { PureComponent } from "react";

class ProductGallery extends PureComponent {
  state = { imageIndex: 0 };

  handleErrorImg = (event) => {
    event.currentTarget.parentNode.style.display = "none";
  };

  changePreviewedImage = (index) => {
    this.setState({ previewedImage: index });
  };

  getGalleryList = (gallery) => {
    return gallery.map((imageURL, index) => {
      return (
        <div key={index} id="GalleryImage">
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
      <div>
        <div>{listOfImages}</div>
        <div>
          <img src={gallery[imageIndex]} alt="Previewed" />
        </div>
      </div>
    );
  }
}

export default ProductGallery;
