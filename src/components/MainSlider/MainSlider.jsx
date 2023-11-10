import React from 'react'
import img1 from '../../images/slider-image-1.jpeg'
import img2 from '../../images//slider-image-2.jpeg'
import img3 from '../../images/slider-image-3.jpeg'
import Slider from 'react-slick'
import './MainSlider.css'
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }
  return (
    <>
      <div className="row g-0">
        <div className="col-md-8">
          <Slider {...settings}>
            <img
              src={img1}
              height={400}
              alt=""
              className="w-100 img-mainSlider"
            />
            <img
              src={img2}
              height={400}
              alt=""
              className="w-100 img-mainSlider"
            />
            <img
              src={img3}
              height={400}
              alt=""
              className="w-100 img-mainSlider"
            />
          </Slider>
        </div>
        <div className="col-md-4">
          <img
            src={img2}
            height={200}
            alt=""
            className="w-100 img-mainSlider"
          />
          <img
            src={img3}
            height={200}
            alt=""
            className="w-100 img-mainSlider"
          />
        </div>
      </div>
    </>
  )
}
