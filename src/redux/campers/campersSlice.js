import { createSlice } from "@reduxjs/toolkit";
import fetchCampers from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    page: 1,
    limit: 4,
    totalItems: 0,
  },
  reducers: {
    clearCampers: (state) => {
      state.items = [];
      state.page = 1;
    },
    countPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, handlePending)
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;

        // Додайте нові картки до існуючих
        if (Array.isArray(action.payload.items)) {
          state.items = [...state.items, ...action.payload.items];
        }

        // Оновіть total
        state.totalItems = action.payload.total || 0; // Оновили з total на totalItems
      })
      .addCase(fetchCampers.rejected, handleRejected);
  },
});

export const { clearCampers } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
