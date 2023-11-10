import React, {useContext, useEffect, useState} from 'react'
import {StoreContext} from '../../Context/StoreContext'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import {Helmet} from 'react-helmet'

export default function Cart() {
  const notify = (msg, type) => toast[type](msg)
  let {getUserCart, deleteCart, updateQty, getCartCount} =
    useContext(StoreContext)
  const [cart, setCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  async function getCart() {
    let token = localStorage.getItem('token')
    if (token) {
      let response = await getUserCart(token)
      setCart(response.data.data)
      setTotalPrice(response.data.data.totalCartPrice)
    }
  }

  async function deleteProduct(productId) {
    let token = localStorage.getItem('token')
    if (token) {
      let response = await deleteCart(token, productId)

      getCartCount(token)
      notify('product deleted successfully', 'success')
      setCart(response.data.data)
      setTotalPrice(response.data.data.totalCartPrice)
    }
  }
  async function updateProduct(productId, count) {
    let token = localStorage.getItem('token')
    if (token) {
      let response = await updateQty(token, productId, count)
      console.log(response)
      notify('product updated successfully', 'success')
      setCart(response.data.data)
      setTotalPrice(response.data.data.totalCartPrice)
    }
  }
  useEffect(() => {
    getCart()
  }, [])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Shop Cart</title>
      </Helmet>

      {cart.products ? (
        <>
          <div className="container">
            <div className="bg-main-light p-3 my-4">
              <h3>Shop Cart</h3>
              <h6 className="text-main fw-bold my-3">
                Total Cart Price: {totalPrice} EGP
              </h6>
              {cart.products.map(item => {
                return (
                  <div key={item._id} className="row my-4 border-bottom">
                    <div className="col-md-1">
                      <img
                        src={item.product.imageCover}
                        className="w-100"
                        alt=""
                      />
                    </div>
                    <div className="col-md-11 d-flex justify-content-between">
                      <div>
                        <h6>{item.product.title}</h6>
                        <h6 className="text-main mx-2">{item.price} EGP</h6>
                        <button
                          onClick={() => {
                            deleteProduct(item.product._id)
                          }}
                          className="text-danger border-0"
                        >
                          Remove <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            updateProduct(item.product._id, item.count + 1)
                          }
                          className="btn btn-outline-success"
                        >
                          +
                        </button>
                        <span className="mx-2">{item.count}</span>
                        <button
                          onClick={() =>
                            updateProduct(item.product._id, item.count - 1)
                          }
                          className="btn btn-outline-success"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
              <Link to={'/checkout/' + cart._id} className="btn btn-success">
                Checkout
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center mt-5 text-success">
          <div
            className="spinner-grow"
            style={{height: '3rem', width: '3rem'}}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  )
}
