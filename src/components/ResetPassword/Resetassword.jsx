import axios from 'axios'
import {useFormik} from 'formik'
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
export default function Resetassword() {
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    newPassword: Yup.string()
      .matches(/^[A-Z][a-z0-9@#$]{5,}$/, 'password must match the pattern')
      .required(),
  })
  let resetFormik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema,
    onSubmit: values => {
      reassword(values)
    },
  })
  async function reassword(values) {
    setLoading(true)
    let {data} = await axios.put(
      'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      values,
    )
    console.log(data)
    if (data.token) {
      setLoading(false)
      navigate('/login')
    }
  }
  return (
    <>
      <div className="w-50 m-auto my-3">
        <form onSubmit={resetFormik.handleSubmit}>
          <label htmlFor="email">email</label>
          <input
            value={resetFormik.values.email}
            type="email"
            name="email"
            id="email"
            className="form-control my-3"
            onBlur={resetFormik.handleBlur}
            onChange={resetFormik.handleChange}
          />
          {resetFormik.errors.email && resetFormik.touched.email ? (
            <div className="alert alert-danger">{resetFormik.errors.email}</div>
          ) : (
            ''
          )}
          <label htmlFor="newPassword">newPassword</label>
          <input
            value={resetFormik.values.newPassword}
            type="password"
            name="newPassword"
            id="newPassword"
            className="form-control my-3"
            onBlur={resetFormik.handleBlur}
            onChange={resetFormik.handleChange}
          />
          {resetFormik.errors.newPassword && resetFormik.touched.newPassword ? (
            <div className="alert alert-danger">
              {resetFormik.errors.newPassword}
            </div>
          ) : (
            ''
          )}
          <button type="submit" className="btn btn-primary">
            {loading ? (
              <div
                class="spinner-border spinner-border-sm text-white"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              'Change'
            )}
          </button>
        </form>
      </div>
    </>
  )
}
