import * as Yup from "yup"

export const BossFormValidation = () =>
  Yup.object().shape({
    pokemon: Yup.object()
      .shape({})
      .nullable()
      .required("Info Requise"),
    difficulty: Yup.number()
      .required("Info Requise")
      .min(1, "min 1")
      .max(5, "max 5")
      .integer("Nombre entier"),
  })
