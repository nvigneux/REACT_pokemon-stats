import * as Yup from "yup"

export const PokemonFormValidation = () =>
  Yup.object().shape({
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
  })
