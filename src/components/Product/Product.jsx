import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {StoreContext} from '../../Context/StoreContext'
import {Helmet} from 'react-helmet'
export default function Product({products}) {
  const [loader, setLoader] = useState(false)
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
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      {products.map(product => {
        return (
          <div className="col-md-2 text-center gy-3 h-100" key={product._id}>
            <div className="product px-2 py-3  ">
              <Link to={'/product-details/' + product._id}>
                <img src={product.imageCover} className="w-100" alt="" />
                <h6 className="text-main">{product.subcategory.name}</h6>
                <p className="fw-bolder">
                  {product.title.split(' ').slice(0, 2).join(' ')}
                </p>
                <div className="d-flex justify-content-between">
                  <span>{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star rating-color"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <div>
                <button
                  onClick={() => addProduct(product._id)}
                  className="btn w-100 text-white bg-main"
                >
                  {loader ? (
                    <div
                      class="spinner-border spinner-border-sm text-white"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    'Add to cart'
                  )}
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
