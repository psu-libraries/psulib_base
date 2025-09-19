import React, { useState } from 'react';
import r2wc from '@r2wc/react-to-web-component';
import Slider from "react-slick";

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      <span>
        <svg role="img" aria-labelledby="Icon-chevronLeft-:r2j:" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="Icon-chevronLeft-:r2j:">chevronLeft icon</title><path fill="#ffffff" d="M14.7444 21.5067L6.49327 13.2556C6.3139 13.0762 6.18685 12.8819 6.11211 12.6726C6.03737 12.4634 6 12.2392 6 12C6 11.7608 6.03737 11.5366 6.11211 11.3274C6.18685 11.1181 6.3139 10.9238 6.49327 10.7444L14.7444 2.49327C15.0732 2.16442 15.4918 2 16 2C16.5082 2 16.9268 2.16442 17.2556 2.49327C17.5845 2.82212 17.7489 3.24066 17.7489 3.74888C17.7489 4.2571 17.5845 4.67564 17.2556 5.00448L10.2601 12L17.2556 18.9955C17.5845 19.3244 17.7489 19.7429 17.7489 20.2511C17.7489 20.7593 17.5845 21.1779 17.2556 21.5067C16.9268 21.8356 16.5082 22 16 22C15.4918 22 15.0732 21.8356 14.7444 21.5067Z"></path></svg>
      </span>
    </div>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      <span>
        <svg role="img" aria-labelledby="Icon-chevronRight-:r2k:" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="Icon-chevronRight-:r2k:">chevronRight icon</title><path fill="#ffffff" d="M6.49327 21.5067C6.16442 21.1779 6 20.7593 6 20.2511C6 19.7429 6.16442 19.3244 6.49327 18.9955L13.4888 12L6.49327 5.00448C6.16442 4.67564 6 4.2571 6 3.74888C6 3.24066 6.16442 2.82212 6.49327 2.49327C6.82212 2.16442 7.24066 2 7.74888 2C8.2571 2 8.67564 2.16442 9.00448 2.49327L17.2556 10.7444C17.435 10.9238 17.562 11.1181 17.6368 11.3274C17.7115 11.5366 17.7489 11.7608 17.7489 12C17.7489 12.2392 17.7115 12.4634 17.6368 12.6726C17.562 12.8819 17.435 13.0762 17.2556 13.2556L9.00448 21.5067C8.67564 21.8356 8.2571 22 7.74888 22C7.24066 22 6.82212 21.8356 6.49327 21.5067Z"></path></svg>
      </span>
    </div>
  );
}

// Define the slider component.
function PsulSlider({ slides, showCaptions }) {
  const [activeSlide, setActiveSlide] = useState(0)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    onInit: () => {
      const dots = document.querySelector('.slider-container .slick-dots');
      const dotsContainer = document.querySelector('.slider-container .slick-dots-container');
      if (dots && dotsContainer) {
        dotsContainer.appendChild(dots);
      }
      console.log('Slider initialized');
    },
    afterChange: (current) => setActiveSlide(current)
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide-media">
            <img src={slide.image} alt={slide.alt} />
          </div>
        ))}
      </Slider>
      {showCaptions ? (
        <div className="slider__captions container">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              {slides.map((slide, index) => (
                <div key={index} className={`slider--caption ${activeSlide === index ? 'active' : ''}`}>
                  {slide.caption}
                </div>
              ))}

            </div>
          </div>
        </div>
      ) : null}
      <div className="slick-dots-container" />
    </div>
  );
}

const SliderElement = r2wc(PsulSlider, {props: {
  slides: 'json',
  showCaptions: 'boolean'
}});

customElements.define('psul-slider', SliderElement);
