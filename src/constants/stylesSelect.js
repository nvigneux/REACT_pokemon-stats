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
    height: "42px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  }),
  valueContainer: defaultStyles => ({
    ...defaultStyles,
    height: "42px",
    padding: "2px 0",
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
  indicatorsContainer: defaultStyles => ({
    ...defaultStyles,
    display: "none",
  }),
  dropdownIndicator: defaultStyles => ({
    ...defaultStyles,
    padding: "8px 0px",
    width: "12px",
  }),
  option: (defaultStyles, state) => ({
    ...defaultStyles,
    background: state.isSelected ? "#EDF2F7" : null,
  }),
}
