import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    location: "", // Для одного значення
    form: "", // Для одного значення
    transmission: "", // Для одного значення
    AC: [], // Множинне значення
    kitchen: [], // Множинне значення
    TV: [], // Множинне значення
    bathroom: [], // Множинне значення
  },
  reducers: {
    setFilters: (state, action) => {
      const { name, value } = action.payload;

      // Для фільтрів, які можуть мати кілька значень (масив)
      if (Array.isArray(state[name])) {
        // Якщо значення вже є в масиві, видаляємо його
        if (state[name].includes(value)) {
          state[name] = state[name].filter((item) => item !== value);
        } else {
          // Інакше додаємо значення в масив
          state[name].push(value);
        }
      } else {
        // Для інших фільтрів, наприклад location або form
        state[name] = value;
      }
    },
    resetFilters: (state) => {
      state.location = "";
      state.form = "";
      state.transmission = "";
      state.AC = [];
      state.kitchen = [];
      state.TV = [];
      state.bathroom = [];
    },
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export const filterReducer = filtersSlice.reducer;
