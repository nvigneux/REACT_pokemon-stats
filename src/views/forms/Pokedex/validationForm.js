import * as Yup from "yup"

export const PokedexFormValidation = () =>
  Yup.object().shape({
    pokemon: Yup.object()
      .shape({})
      .nullable()
      .required("Required"),
    iv_attack: Yup.number()
      .required("Required")
      .integer("No decimal value !"),
    iv_defense: Yup.number()
      .required("Required")
      .integer("No decimal value !"),
    iv_stamina: Yup.number()
      .required("Required")
      .integer("No decimal value !"),
    level: Yup.number()
      .required("Required")
      .positive("Positive number !")
      .integer("No decimal value !"),
  })
