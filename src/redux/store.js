import { configureStore } from "@reduxjs/toolkit";
import { campersReducer } from "./campers/campersSlice";
import { filterReducer } from "./campers/filterSlice";
import { favoritesReducer } from "./campers/favouritesSlice";

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filterReducer,
    favourites: favoritesReducer,
  },
});
