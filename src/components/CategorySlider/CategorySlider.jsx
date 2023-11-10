import React, {useContext} from 'react'
import Slider from 'react-slick'
import './CategorySlider.css'
import {StoreContext} from '../../Context/StoreContext'
export default function CategorySlider() {
  let {categoryList} = useContext(StoreContext)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
  }
  return (
    <div className="mt-5 container">
      <h3>Shop popular category</h3>
      <Slider {...settings}>
        {categoryList.map(item => {
          return (
            <div key={item._id}>
              <img
                src={item.image}
                className="w-100 img-categorySlider"
                height={250}
                alt=""
              />
              <h6 className="mt-2">{item.name}</h6>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}
