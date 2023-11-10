import axios from 'axios'
import {useFormik} from 'formik'
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import {toast} from 'react-toastify'
export default function Login({saveUserData}) {
  const notify = (msg, type) => toast[type](msg)
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9@#$]{5,}$/, 'password must match the pattern')
      .required(),
  })
  let registerFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      setLoading(true)
      console.log(values)
      axios
        .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
        .then(data => {
          if (data.status === 200) {
            localStorage.setItem('token', data.data.token)
            saveUserData()
            notify('Success', 'success')
            setLoading(false)
            navigate('/')
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            notify(error.response.data.message, 'error')
            setLoading(false)
            // alert(error.response.data.message)
          }
        })
    },
  })
  return (
    <>
      <div className="w-50 m-auto my-3">
        <h2>Login Now :</h2>
        <form onSubmit={registerFormik.handleSubmit}>
          <label htmlFor="email">email</label>
          <input
            value={registerFormik.values.email}
            type="email"
            name="email"
            id="email"
            className="form-control my-3"
            onBlur={registerFormik.handleBlur}
            onChange={registerFormik.handleChange}
          />
          {registerFormik.errors.email && registerFormik.touched.email ? (
            <div className="alert alert-danger">
              {registerFormik.errors.email}
            </div>
          ) : (
            ''
          )}
          <label htmlFor="password">Password</label>
          <input
            value={registerFormik.values.password}
            type="password"
            name="password"
            id="password"
            className="form-control my-3"
            onBlur={registerFormik.handleBlur}
            onChange={registerFormik.handleChange}
          />
          {registerFormik.errors.password && registerFormik.touched.password ? (
            <div className="alert alert-danger">
              {registerFormik.errors.password}
            </div>
          ) : (
            ''
          )}
          <Link className="d-block text-primary" to="/forgetPassword">
            did u forget your password ?
          </Link>
          <button
            disabled={!(registerFormik.isValid && registerFormik.dirty)}
            className="btn bg-main text-white"
          >
            {loading ? (
              <div
                className="spinner-border spinner-border-sm text-white"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </>
  )
}
