import { createSlice } from "@reduxjs/toolkit";

const getSelectedCampers = () => {
  const savedCampers = localStorage.getItem("selectedCampers");
  return savedCampers ? JSON.parse(savedCampers) : [];
};

const saveSelectedCampers = (campers) => {
  localStorage.setItem("selectedCampers", JSON.stringify(campers));
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    selectedCampers: getSelectedCampers(),
  },
  reducers: {
    addToFavorites: (state, action) => {
      const camper = action.payload;
      if (!state.selectedCampers.some((item) => item.id === camper.id)) {
        state.selectedCampers.push(camper);
        saveSelectedCampers(state.selectedCampers);
      }
    },
    removeFromFavorites: (state, action) => {
      const camperId = action.payload;
      state.selectedCampers = state.selectedCampers.filter(
        (camper) => camper.id !== camperId
      );
      saveSelectedCampers(state.selectedCampers);
    },
    resetFavorites: (state) => {
      state.selectedCampers = [];
      saveSelectedCampers(state.selectedCampers);
    },
  },
});

export const { addToFavorites, removeFromFavorites, resetFavorites } =
  favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
