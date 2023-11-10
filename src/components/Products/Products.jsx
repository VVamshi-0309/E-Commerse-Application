import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Product from '../Product/Product'
import {Helmet} from 'react-helmet'

export default function Products() {
  const [products, setProducts] = useState([])

  async function getAllProducts() {
    let {data} = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`,
      {
        params: {
          sort: 'title',
        },
      },
    )
    setProducts(data.data)
  }
  useEffect(() => {
    getAllProducts()
  }, [])
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      <div className="container my-3">
        {products.length > 0 ? (
          <div className="row">
            <Product products={products} />
          </div>
        ) : (
          <div class="text-center mt-5 text-success">
            <div
              class="spinner-grow"
              style={{height: '3rem', width: '3rem'}}
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
