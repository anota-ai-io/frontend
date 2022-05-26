import React, {  useEffect, forwardRef } from 'react';
import {Thumbnail} from './components/Thumbnail/index';
import {DotIcon} from './components/DotIcon';
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon
} from "@heroicons/react/outline";


const CarouselBase = ({ children }) => {
  const [index, setIndex] = React.useState(0);
  const keys = children.map((child, index) => index);
  
  const _slides = () => {
    return children.map((child, idx) => (
      <Thumbnail key={idx} id={idx} selectedKey={index}>
        {child}
      </Thumbnail>
    ));
  }

  const _sliderDots = () => {
    return keys.map(key => (
      <span key={key} onClick={() => setIndex(key)}>
        {<DotIcon selected={key === index} />}
      </span>
    ));
  }

  return (
    <div className="border-dashed border-2 border-gray-100 p-5 m-auto flex justify-center">
      <div className="grid grid-flow-row auto-rows-max">
        <div className="min-h-100">
          {/* <ArrowCircleLeftIcon /> */}
          { _slides() }
          {/* <ArrowCircleRightIcon /> */}
        </div>
        <div className="flex justify-center mt-2">
          { _sliderDots() }
        </div>
      </div>
    </div>
  );
}


export const Carousel = forwardRef(CarouselBase);
