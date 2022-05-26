import React from 'react';

const Slides = () => (
  IMAGES.map((image, index) => <img key={index} src={image.imageUrl} alt={image.placeHolder} />)
);

export default Slides;