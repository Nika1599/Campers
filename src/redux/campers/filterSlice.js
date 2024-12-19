import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    location: "",
    vehicleType: "",
    airConditioning: false,
    automatic: false,
    kitchen: false,
    tv: false,
    equipment: "",
    bathroom: false,
  },
  reducers: {
    setFilters: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetFilters: (state) => {
      state.location = "";
      state.vehicleType = "";
      state.airConditioning = false;
      state.automatic = false;
      state.kitchen = false;
      state.tv = false;
      state.equipment = "";
      state.bathroom = false;
    },
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export const filterReducer = filtersSlice.reducer;
