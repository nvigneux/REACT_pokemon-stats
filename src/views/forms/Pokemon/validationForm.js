import * as Yup from "yup"

export const PokemonFormInitValues = {
  id_base_pokemon: 0,
  name: "",
  attack: 0,
  defense: 0,
  stamina: 0,
  type: [],
}

export const PokemonFormValidation = Yup.object().shape({
  id_base_pokemon: Yup.number()
    .required("Info Requise")
    .positive("Nombre positif")
    .integer("Nombre entier"),
  name: Yup.string().required("Info Requise"),
  attack: Yup.number()
    .required("Info Requise")
    .positive("Nombre positif")
    .integer("Nombre entier"),
  defense: Yup.number()
    .required("Info Requise")
    .positive("Nombre positif")
    .integer("Nombre entier"),
  stamina: Yup.number()
    .required("Info Requise")
    .positive("Nombre positif")
    .integer("Nombre entier"),
  type: Yup.array()
    .required("Info Requise")
    .nullable("React-Select fix Soon, null")
    .min(1, "min 1 type !")
    .max(2, "max 2 type"),
})
