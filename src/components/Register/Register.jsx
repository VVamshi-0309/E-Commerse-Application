import axios from 'axios'
import {useFormik} from 'formik'
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import {toast} from 'react-toastify'
export default function Register() {
  const notify = (msg, type) => toast[type](msg)
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  const validationSchema = Yup.object({
    name: Yup.string().min(3).max(15).required(),
    email: Yup.string().email().required(),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9@#$]{5,}$/,
        'password must start with 1uppercase and must be at least 6 characters',
      )
      .required(),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'password and repassword not match')
      .required(),
  })
  let registerFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
    },
    validationSchema,
    onSubmit: values => {
      setLoading(true)
      console.log(values)
      axios
        .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
        .then(data => {
          if (data.status === 201) {
            // localStorage.setItem("token",data.data.token)
            notify('Success', 'success')
            setLoading(false)
            navigate('/login')
          }
        })
        .catch(error => {
          if (error.response.status === 409) {
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
        <h2>Register Now :</h2>
        <form onSubmit={registerFormik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            value={registerFormik.values.name}
            type="text"
            name="name"
            id="name"
            className="form-control my-3"
            onBlur={registerFormik.handleBlur}
            onChange={registerFormik.handleChange}
          />
          {registerFormik.errors.name && registerFormik.touched.name ? (
            <div className="alert alert-danger">
              {registerFormik.errors.name}
            </div>
          ) : (
            ''
          )}
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
          <label htmlFor="rePassword">rePassword</label>
          <input
            value={registerFormik.values.rePassword}
            type="password"
            name="rePassword"
            id="rePassword"
            className="form-control my-3"
            onBlur={registerFormik.handleBlur}
            onChange={registerFormik.handleChange}
          />
          {registerFormik.errors.rePassword &&
          registerFormik.touched.rePassword ? (
            <div className="alert alert-danger">
              {registerFormik.errors.rePassword}
            </div>
          ) : (
            ''
          )}
          <button
            type="submit"
            disabled={!(registerFormik.isValid && registerFormik.dirty)}
            className="btn bg-main text-white"
          >
            {!loading ? (
              'Register'
            ) : (
              <div
                className="spinner-border spinner-border-sm text-white"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </button>
        </form>
      </div>
    </>
  )
}
