import * as Yup from "yup"

export const LoginFormInitValues = {
  password: "",
}

export const LoginFormValidation = Yup.object().shape({
  password: Yup.string()
    .required("No password provided.")
    .min(6, "Password is too short - 6 chars minimum."),
})
