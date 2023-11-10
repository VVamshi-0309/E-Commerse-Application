import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {StoreContext} from '../../Context/StoreContext'
import {toast} from 'react-toastify'
import Slider from 'react-slick'
import {Helmet} from 'react-helmet'
export default function () {
  const [isLoading, setisLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }
  let {id} = useParams()
  const [productDetail, setProductDetail] = useState([])
  const notify = (msg, type) => toast[type](msg)
  let {addTOCart, getCartCount} = useContext(StoreContext)

  async function addProduct(productId) {
    setLoader(true)
    let token = localStorage.getItem('token')
    if (token) {
      let response = await addTOCart(token, productId)
      if (response.status === 200) {
        getCartCount(token)
        notify('your product added successfully', 'success')
        setLoader(false)
      }
    } else {
      alert('error')
      setLoader(false)
    }
  }
  async function getProduct() {
    setisLoading(true)
    let {data} = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products/${id}`,
    )
    setProductDetail(data.data)
    setisLoading(false)
  }
  useEffect(() => {
    getProduct()
  }, [])
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Product Details</title>
      </Helmet>
      <div className="container">
        {isLoading ? (
          <div class="text-center mt-5 text-success">
            <div
              class="spinner-grow"
              style={{height: '3rem', width: '3rem'}}
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row align-items-center">
            <div className="col-md-3">
              <Slider {...settings}>
                {productDetail.images?.map(IMG => <img src={IMG} alt="" />)}
              </Slider>
            </div>
            <div className="col-md-9">
              <h3>{productDetail.title}</h3>
              <p>{productDetail.description}</p>
              <div className="d-flex justify-content-between">
                <span>{productDetail.price} EGP</span>
                <span>
                  <i className="fas fa-star rating-color"></i>
                  {productDetail.ratingsAverage}
                </span>
              </div>
              <button
                onClick={() => addProduct(productDetail._id)}
                className="btn mt-3 w-100 text-white bg-main"
              >
                {loader ? (
                  <div
                    class="spinner-border spinner-border-sm text-white"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  ' Add to cart'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
