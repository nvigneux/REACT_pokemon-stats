import * as Yup from "yup"

export const PokedexFormInitValues = {
  level: 1,
  iv_attack: 0,
  iv_defense: 0,
  iv_stamina: 0,
  quick_move: null,
  charged_move: null,
}

export const PokedexFormValidation = Yup.object().shape({
  iv_attack: Yup.number()
    .required("Required")
    .min(0, "iv min 0")
    .max(15, "iv max 15")
    .integer("No decimal value !"),
  iv_defense: Yup.number()
    .required("Required")
    .min(0, "iv min 0")
    .max(15, "iv max 15")
    .integer("No decimal value !"),
  iv_stamina: Yup.number()
    .required("Required")
    .min(0, "iv min 0")
    .max(15, "iv max 15")
    .integer("No decimal value !"),
  level: Yup.number()
    .required("Required")
    .positive("Positive number !")
    .min(1, "level min 1")
    .max(40, "level max 40")
    .integer("No decimal value !"),
  quick_move: Yup.object()
    .shape({})
    .nullable()
    .required("Required"),
  charged_move: Yup.object()
    .shape({})
    .nullable()
    .required("Required"),
})

export const PokedexSelectValidation = Yup.object().shape({
  pokemon: Yup.object()
    .shape({})
    .nullable()
    .required("Required"),
})
