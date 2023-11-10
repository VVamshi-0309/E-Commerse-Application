import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Helmet} from 'react-helmet'
import {Link, useParams} from 'react-router-dom'

export default function BrandProducts() {
  const [allProductsBrand, setallProductsBrand] = useState([])

  let {id} = useParams()

  async function getBrandProducts() {
    let {data} = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`,
      {
        params: {
          brand: id,
        },
      },
    )
    setallProductsBrand(data.data)
  }

  useEffect(() => {
    getBrandProducts()
  }, [])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands Products</title>
      </Helmet>
      <div className="container">
        <div className="row">
          {allProductsBrand.length > 0 ? (
            allProductsBrand.map((prod, index) => {
              return (
                <div key={index} className="col-md-4">
                  <Link to={`/product-details/${prod._id}`}>
                    <div className="item-product">
                      <img src={prod.imageCover} className="w-100" alt="" />
                      <h2>{prod.title.split(' ').slice(0, 2).join(' ')}</h2>
                      <p>{prod.description}</p>
                    </div>
                  </Link>
                </div>
              )
            })
          ) : (
            <h2 className="text-center my-5">
              No Products Available right now...
            </h2>
          )}
        </div>
      </div>
    </>
  )
}
