import { createSlice } from "@reduxjs/toolkit";

const loadFavouritesFromStorage = () => {
  try {
    const storedFavourites = localStorage.getItem("favourites");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  } catch (error) {
    console.error("Error loading favourites from storage:", error);
    return [];
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: loadFavouritesFromStorage(),
  },
  reducers: {
    addToFavorites: (state, action) => {
      if (!state.items.some((item) => item.id === action.payload.id)) {
        state.items.push(action.payload);
        localStorage.setItem("favourites", JSON.stringify(state.items));
      }
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
