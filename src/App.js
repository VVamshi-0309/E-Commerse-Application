import {Navigate, RouterProvider, createHashRouter} from 'react-router-dom'
import Products from './Components/Products/Products'
import HomePage from './Pages/HomePage'
import MainLayout from './Layouts/MainLayout'
import './App.css'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import {ToastContainer} from 'react-toastify'
import StoreContextProvider from './Context/StoreContext'
import Cart from './Components/Cart/Cart'
import Categories from '../src/Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Checkout from './Components/Checkout/Checkout'
import {useEffect, useState} from 'react'
import jwtDecode from 'jwt-decode'
import ForgetPass from './Components/ForgetPass/ForgetPass'
import Resetassword from './Components/ResetPassword/Resetassword'
import Notfound from './Components/Notfound/Notfound'
import BrandProducts from './Components/BrandProducts/BrandProducts'
import {Offline} from 'react-detect-offline'
function App() {
  const [userData, setUserData] = useState(null)
  function saveUserData() {
    let encodedToken = localStorage.getItem('token')
    let decodedToken = jwtDecode(encodedToken)
    setUserData(decodedToken)
  }
  function ProtectedRoutes({children}) {
    if (localStorage.getItem('token') == null) {
      return <Navigate to={'/login'} />
    } else {
      return children
    }
  }
  function logout() {
    localStorage.removeItem('token')
    setUserData(null)
  }
  useEffect(() => {
    if (localStorage.getItem('token') !== null && userData == null) {
      saveUserData()
    }
  }, [])

  let routes = createHashRouter([
    {
      path: '',
      element: <MainLayout userData={userData} logout={logout} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <HomePage />{' '}
            </ProtectedRoutes>
          ),
        },
        {
          path: 'products',
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'category',
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'brands',
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'brandProduct/:id',
          element: (
            <ProtectedRoutes>
              <BrandProducts />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'product-details/:id',
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {path: 'register', element: <Register />},
        {path: 'login', element: <Login saveUserData={saveUserData} />},
        {path: 'forgetPassword', element: <ForgetPass />},
        {path: 'resetPassword', element: <Resetassword />},
        {
          path: 'cart',
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {path: 'checkout/:cartId', element: <Checkout />},
        {path: '*', element: <Notfound />},
      ],
    },
  ])
  return (
    <>
      <Offline>
        {' '}
        <span className="network-Status">Only shown offline (surprise!)</span>
      </Offline>

      <div className="App">
        <ToastContainer theme="colored" />
        <StoreContextProvider>
          <RouterProvider router={routes} />
        </StoreContextProvider>
      </div>
    </>
  )
}

export default App
