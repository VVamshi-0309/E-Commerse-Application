import React from 'react'
import './Footer.css'
export default function Footer() {
  return (
    <div className="footer py-5 mt-5">
      <div className=" container">
        <h2>Fresh Cart Footer</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima,
          porro!
        </p>
        <div className="d-flex flex-wrap justify-content-between">
          <input
            type="email"
            placeholder="email..."
            className="form-control w-75"
          />
          <button className="btn btn-success">Share App Link</button>
        </div>
        <div className="border-top border-bottom border-2 border-danger mt-3 py-5 d-flex flex-wrap justify-content-between align-items-center">
          <div className="leftPart">
            <ul className="list-unstyled d-flex flex-wrap align-items-center">
              <li className="text-primary me-2">
                <h6>Payment Parameters</h6>
              </li>
              <li className="text-primary me-2">
                <i class="fa-brands fa-paypal"></i>
              </li>
              <li className="text-primary me-2">
                <i class="fa-brands fa-amazon-pay"></i>
              </li>
              <li className="text-primary me-2">
                <i class="fa-brands fa-cc-mastercard"></i>
              </li>
            </ul>
          </div>
          <div className="rightPart d-flex flex-wrap align-items-center">
            <h6 className="pe-1">Get Deliveries with Freshcard</h6>
            <button className="btn btn-dark me-1">
              Available on Store App
            </button>
            <button className="btn btn-dark me-1">
              Get it from Google Play
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
