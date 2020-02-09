import * as Yup from "yup"

export const LoginFormInitValues = {
  identifier: "",
  password: "",
}

export const LoginFormValidation = Yup.object().shape({
  identifier: Yup.string(),
  password: Yup.string()
    .required("No password provided.")
    .min(6, "Password is too short - should be 6 chars minimum."),
})
