import * as Yup from "yup"

export const PokedexFormInitValues = {
  level: 1,
  iv_attack: 0,
  iv_defense: 0,
  iv_stamina: 0,
  quick_move: null,
  charged_move: null,
  pokemon: null,
}

export const PokedexFormValidation = Yup.object().shape({
  iv_attack: Yup.number()
    .required("Info Requise")
    .min(0, "iv min 0")
    .max(15, "iv max 15")
    .integer("Nombre entier"),
  iv_defense: Yup.number()
    .required("Info Requise")
    .min(0, "iv min 0")
    .max(15, "iv max 15")
    .integer("Nombre entier"),
  iv_stamina: Yup.number()
    .required("Info Requise")
    .min(0, "iv min 0")
    .max(15, "iv max 15")
    .integer("Nombre entier"),
  level: Yup.number()
    .required("Info Requise")
    .positive("Nombre positif")
    .min(1, "level min 1")
    .max(40, "level max 40"),
  quick_move: Yup.object()
    .shape({})
    .nullable()
    .required("Info Requise"),
  charged_move: Yup.object()
    .shape({})
    .nullable()
    .required("Info Requise"),
})

export const PokedexSelectValidation = Yup.object().shape({
  pokemon: Yup.object()
    .shape({})
    .nullable()
    .required("Info Requise"),
})
