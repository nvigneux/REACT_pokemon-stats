import * as Yup from "yup"

export const BossFormValidation = () =>
  Yup.object().shape({
    pokemon: Yup.object()
      .shape({})
      .nullable()
      .required("Required"),
    difficulty: Yup.number()
      .required("Required")
      .min(1, "min 1")
      .max(5, "max 5")
      .integer("No decimal value !"),
  })
