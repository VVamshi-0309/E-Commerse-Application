import React, {useContext} from 'react'
import {Link, NavLink} from 'react-router-dom'
import logo from '../../images/freshcart-logo.svg'
import {StoreContext} from '../../Context/StoreContext'
export default function Navbar({userData, logout}) {
  let {count} = useContext(StoreContext)
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-main-light">
        <div className="container">
          <Link className="navbar-brand" href="#">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData != null ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/category">
                    Categories
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/products">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/brands">
                    Brands
                  </NavLink>
                </li>
              </ul>
            ) : (
              ''
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mt-2">
              {userData == null ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="login">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      to="/cart"
                      type="button"
                      className="btn position-relative me-2"
                    >
                      Cart <i className="fa-solid fa-cart-shopping"></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                        {count}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={logout} className="nav-link" to="login">
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
