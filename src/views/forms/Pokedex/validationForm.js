import * as Yup from "yup"

export const PokedexFormValidation = Yup.object().shape({
  iv_attack: Yup.number()
    .required("Required")
    .max(15, "iv max 15")
    .integer("No decimal value !"),
  iv_defense: Yup.number()
    .required("Required")
    .max(15, "iv max 15")
    .integer("No decimal value !"),
  iv_stamina: Yup.number()
    .required("Required")
    .max(15, "iv max 15")
    .integer("No decimal value !"),
  level: Yup.number()
    .required("Required")
    .positive("Positive number !")
    .max(40, "level max 40")
    .integer("No decimal value !"),
})

export const PokedexSelectValidation = Yup.object().shape({
  pokemon: Yup.object()
    .shape({})
    .nullable()
    .required("Required"),
})
