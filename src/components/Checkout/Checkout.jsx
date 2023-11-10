import axios from 'axios'
import {useFormik} from 'formik'
import React from 'react'
import {useParams} from 'react-router-dom'

export default function Checkout() {
  let {cartId} = useParams()
  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    onSubmit: values => {
      Checkout(values, cartId)
    },
  })
  async function Checkout(vls, id) {
    let body = {
      shippingAddress: vls,
    }
    let headers = {
      token: localStorage.getItem('token'),
    }
    console.log(body)
    let {data} = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
      body,
      {headers},
    )
    if (data.status === 'success') {
      window.open(data.session.url, '_self')
    }
  }
  return (
    <>
      <div className="w-75 mx-auto my-5">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">Details</label>
          <input
            type="text"
            id="details"
            name="details"
            className="form-control my-3"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control my-3"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="name">City</label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-control my-3"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button type="submit" className="btn btn-success">
            Pay
          </button>
        </form>
      </div>
    </>
  )
}
