import React from 'react'
import MainSlider from '../Components/MainSlider/MainSlider'
import CategorySlider from '../Components/CategorySlider/CategorySlider'
import Products from '../Components/Products/Products'
import {Helmet} from 'react-helmet'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home Page</title>
      </Helmet>
      <MainSlider />
      <CategorySlider />
      <Products />
    </>
  )
}
