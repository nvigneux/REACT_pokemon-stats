import React from "react"
import { Formik, Form } from "formik"

import useApi from "../../hooks/useApi"

import {
  LoginFormValidation,
  LoginForm,
  LoginFormInitValues,
} from "../forms/Login"

// Utils & misc
import style from "./Login.module.css"

const Login = ({ history }) => {
  const [, , , { postLogin }] = useApi()

  const LoginValueSchema = {
    ...LoginFormInitValues,
    ...LoginFormInitValues,
  }
  const handleSubmitForm = ({ password }, resetForm) => {
    postLogin({ identifier: password, password }).then(({ data }) => {
      if (data) {
        localStorage.setItem(
          "auth",
          JSON.stringify({ user: data.user.id, token: data.jwt })
        )
        setTimeout(() => {
          history.push("/")
        }, 1000)
      }
      resetForm()
    })
  }

  return (
    <>
      <Formik
        initialValues={LoginValueSchema}
        validationSchema={LoginFormValidation}
        onSubmit={(values, { resetForm }) =>
          handleSubmitForm(values, resetForm)
        }
      >
        {({ isSubmitting, errors, touched, ...props }) => (
          <Form className="bg-pokemon flex flex-col items-center justify-center h-full h-screen">
            <div className="flex flex-col justify-center items-center w-full max-w-xs bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4">
              <LoginForm {...props} />

              <button
                className="self-center tracking-wide uppercase bg-green-pokemon text-white text-sm font-bold mt-4 py-3 px-8 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Envoyer
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Login
