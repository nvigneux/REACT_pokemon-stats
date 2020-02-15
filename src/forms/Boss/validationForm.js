import * as Yup from "yup"

export const BossFormInitValues = {
  level: 41,
  difficulty: 1,
  cp: 0,
  iv_attack: 15,
  iv_defense: 15,
  iv_stamina: 1,
  quick_move: null,
  charged_move: null,
  pokemon: null,
}

export const BossFormValidation = Yup.object().shape({
  iv_attack: Yup.number().integer("Nombre entier"),
  iv_defense: Yup.number().integer("Nombre entier"),
  iv_stamina: Yup.number()
    .positive("Nombre positif")
    .min(1, "difficulté min 1")
    .integer("Nombre entier")
    .typeError("Doit etre un nombre !")
    .nullable(),
  level: Yup.number(),
  difficulty: Yup.number()
    .required("Info Requise")
    .positive("Nombre positif")
    .min(1, "difficulté min 1")
    .max(5, "difficulté max 5")
    .integer("Nombre entier"),
  quick_move: Yup.object()
    .shape({})
    .nullable()
    .required("Info Requise"),
  charged_move: Yup.object()
    .shape({})
    .nullable()
    .required("Info Requise"),
})

export const BossSelectValidation = Yup.object().shape({
  pokemon: Yup.object()
    .shape({})
    .nullable()
    .required("Info Requise"),
})
