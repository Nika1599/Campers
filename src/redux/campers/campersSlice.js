import { createSlice } from "@reduxjs/toolkit";
import fetchCampers from "./operations";
import { fetchCamperById } from "./operations";

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
    selectedCamper: null,
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

        // Оновіть totalItems, якщо це значення є в payload
        if (action.payload.total !== undefined) {
          state.totalItems = action.payload.total;
        }

        // Якщо total не приходить, то ви можете встановити значення вручну
        if (!state.totalItems) {
          state.totalItems = 0;
        }
      })
      .addCase(fetchCampers.rejected, handleRejected)
      .addCase(fetchCamperById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCampers } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
