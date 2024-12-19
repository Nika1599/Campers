import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    location: "",
    form: "",
    transmission: "",
    AC: null,
    kitchen: null,
    TV: null,
    bathroom: null,
  },
  reducers: {
    setFilters: (state, action) => {
      const { name, value } = action.payload;
      if (state[name] === value) {
        state[name] = null;
      } else {
        state[name] = value;
      }
    },
    resetFilters: (state) => {
      state.location = "";
      state.form = "";
      state.transmission = "";
      state.AC = false;
      state.kitchen = false;
      state.TV = false;
      state.bathroom = false;
    },
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export const filterReducer = filtersSlice.reducer;
