import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Slider() {
  return (
    <section>
      <Carousel autoplay infiniteLoop interval={3000}>
        <div>
          <img loading="lazy" src="images/slider-1.jpg" />
        </div>
        <div>
          <img loading="lazy" src="images/slider-2.jpg" />
        </div>
        <div>
          <img loading="lazy" src="images/slider-3.jpg" />
        </div>
        <div>
          <img loading="lazy" src="images/slider-4.jpeg" />
        </div>
      </Carousel>
    </section>
  );
}

export default Slider;
