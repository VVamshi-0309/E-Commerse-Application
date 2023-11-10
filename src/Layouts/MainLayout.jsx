import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import {Outlet} from 'react-router-dom'
import Footer from '../Components/Footer/Footer'

export default function MainLayout({userData, logout}) {
  return (
    <>
      <Navbar userData={userData} logout={logout} />
      <Outlet />
      <Footer />
    </>
  )
}
