import axios from 'axios'
import {useFormik} from 'formik'
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
export default function ForgetPass() {
  const [codeFlag, setCode] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  let navg = useNavigate()
  let validationSchema = Yup.object({
    email: Yup.string().required().email('enter valid email'),
  })
  let forgetPassword = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: valus => {
      forgetPasswordApi(valus)
    },
  })
  let verifyCodeFormik = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: valus => {
      verifyCode(valus)
    },
  })

  async function forgetPasswordApi(valus) {
    setLoading(true)
    let {data} = await axios.post(
      'https://route-ecommerce-app.vercel.app/api/v1/auth/forgotPasswords',
      valus,
    )

    // console.log(data);
    if (data.statusMsg == 'success') {
      setCode(false)
      setLoading(false)
    }
  }
  async function verifyCode(valus) {
    setLoading(true)
    let {data} = await axios
      .post(
        'https://route-ecommerce-app.vercel.app/api/v1/auth/verifyResetCode',
        valus,
      )
      .catch(err => {
        setErrorMsg(err.response.data.message)
        setLoading(false)
      })
    if (data.status == 'Success') {
      navg('/resetPassword')
      setLoading(false)
    }
    console.log(data)
  }
  return (
    <>
      <div className="container className='w-50 mx-auto my-4'">
        {codeFlag ? (
          <form onSubmit={forgetPassword.handleSubmit}>
            <label htmlFor="email">email</label>
            <input
              value={forgetPassword.values.email}
              type="email"
              name="email"
              id="email"
              className="form-control my-3"
              onBlur={forgetPassword.handleBlur}
              onChange={forgetPassword.handleChange}
            />
            {forgetPassword.errors.email && forgetPassword.touched.email ? (
              <div className="alert alert-danger">
                {forgetPassword.errors.email}
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
                'Send Message'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyCodeFormik.handleSubmit}>
            <label htmlFor="resetCode">resetCode</label>
            <input
              value={verifyCodeFormik.values.resetCode}
              type="text"
              name="resetCode"
              id="resetCode"
              className="form-control my-3"
              onChange={verifyCodeFormik.handleChange}
            />
            {errorMsg != '' ? (
              <div className="alert alert-danger">{errorMsg}</div>
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
                'Verify Code'
              )}
            </button>
          </form>
        )}
      </div>
    </>
  )
}
