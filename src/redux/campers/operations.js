import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async ({ filters, page, limit }, thunkAPI) => {
    try {
      const cleanedFilters = { ...filters };

      // Очищення фільтрів для масивів та пустих значень
      Object.keys(cleanedFilters).forEach((key) => {
        if (
          cleanedFilters[key] === "" ||
          cleanedFilters[key] === null ||
          (Array.isArray(cleanedFilters[key]) &&
            cleanedFilters[key].length === 0)
        ) {
          delete cleanedFilters[key];
        }
      });

      // Формування query params
      const queryParams = new URLSearchParams();
      Object.keys(cleanedFilters).forEach((key) => {
        if (Array.isArray(cleanedFilters[key])) {
          queryParams.set(key, cleanedFilters[key].join(",")); // Масиви у рядок
        } else {
          queryParams.set(key, cleanedFilters[key]);
        }
      });
      queryParams.set("page", page);
      queryParams.set("limit", limit);
      const queryString = queryParams.toString();
      console.log("Query params:", queryString);

      const response = await axios.get(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?${queryString}`
      );
      return {
        items: response.data.items,
        total: response.data.total, // Змінили totalItems на total
      };
    } catch (error) {
      console.error("Error fetching campers:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export default fetchCampers;
