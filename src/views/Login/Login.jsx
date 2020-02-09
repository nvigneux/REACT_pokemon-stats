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
  const handleSubmitForm = ({ password }) => {
    postLogin({ identifier: password, password }).then(({ data }) => {
      localStorage.setItem(
        "auth",
        JSON.stringify({ user: data.user.id, token: data.jwt })
      )
      setTimeout(() => {
        history.push("/")
      }, 1000)
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
          <Form className="flex flex-col mt-2 mb-16">
            <LoginForm {...props} />

            <button
              className="self-end tracking-wide uppercase bg-green-pokemon text-white text-sm font-bold mt-4 py-3 px-8 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Envoyer
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Login
