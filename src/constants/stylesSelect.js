export const selectForm = {
  singleValue: defaultStyles => ({
    ...defaultStyles,
    width: "92%",
  }),
  container: defaultStyles => ({
    ...defaultStyles,
    border: "2px solid #4e7477",
    borderRadius: "9999px",
  }),
  control: defaultStyles => ({
    ...defaultStyles,
    border: "none",
    borderRadius: "9999px",
  }),
  placeholder: defaultStyles => ({
    ...defaultStyles,
    fontSize: "0.75rem",
    color: "#96a4a5",
    textTransform: "uppercase",
  }),
  indicatorSeparator: () => null,
}

export const selectWeather = {
  singleValue: defaultStyles => ({
    ...defaultStyles,
    width: "92%",
  }),
  valueContainer: defaultStyles => ({
    ...defaultStyles,
    height: "42px",
    padding: "2px 4px",
  }),
  container: defaultStyles => ({
    ...defaultStyles,
    border: "none",
  }),
  control: (defaultStyles, state) => ({
    ...defaultStyles,
    border: "none",
    boxShadow: 0,
  }),
  placeholder: defaultStyles => ({
    ...defaultStyles,
    fontSize: "0.75rem",
    color: "#96a4a5",
    textTransform: "uppercase",
  }),
  indicatorSeparator: () => null,
  dropdownIndicator: defaultStyles => ({
    ...defaultStyles,
    padding: "8px 0px",
    width: "12px",
  }),
}
