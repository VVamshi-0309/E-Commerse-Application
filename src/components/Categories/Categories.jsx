import React, {useContext} from 'react'
import {StoreContext} from '../../Context/StoreContext'
import {Helmet} from 'react-helmet'

export default function Categories() {
  let {categoryList} = useContext(StoreContext)
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
      </Helmet>
      <div className="container mt-4">
        <div className="row">
          {categoryList.map(item => {
            return (
              <div className="col-md-3" key={item._id}>
                <img
                  src={item.image}
                  className="w-100 img-categorySlider mb-3"
                  height={250}
                  alt=""
                />
                <h6>{item.name}</h6>
                <p>{item._id}</p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
