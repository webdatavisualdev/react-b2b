import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { ReactComponent as LeftArrowIcon } from "icons/arrow-left.svg";
import { ReactComponent as RightArrowIcon } from "icons/arrow-right.svg";
import styles from "./Carousel.module.scss";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    partialVisibilityGutter: 100,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisibilityGutter: 200,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 100,
  },
};

const CustomCarousel = ({ image }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const randomImages = image.map((img) => img.url);
    setImages(randomImages);
  }, [image]);

  return (
    <div className={styles.root}>
      <Carousel
        draggable
        swipeable
        infinite
        centerMode
        itemClass="image-item"
        additionalTransfrom={0}
        responsive={responsive}
        customLeftArrow={<LeftArrowIcon className={styles.leftArrow} />}
        customRightArrow={<RightArrowIcon className={styles.rightArrow} />}
      >
        {images.map((image, i) => {
          return (
            <div
              className={styles.carousel}
              style={{
                backgroundImage: `url(${image})`,
              }}
            >
              <div className="overlay" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
