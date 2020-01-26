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
    .required("Required")
    .positive("Positive number !")
    .integer("No decimal value !"),
  name: Yup.string().required("Required"),
  attack: Yup.number()
    .required("Required")
    .positive("Positive number !")
    .integer("No decimal value !"),
  defense: Yup.number()
    .required("Required")
    .positive("Positive number !")
    .integer("No decimal value !"),
  stamina: Yup.number()
    .required("Required")
    .positive("Positive number !")
    .integer("No decimal value !"),
  type: Yup.array()
    .required("Required")
    .nullable("React-Select fix Soon, null")
    .min(1, "min 1 type !")
    .max(2, "max 2 type"),
})
