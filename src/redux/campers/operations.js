import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async (filters, thunkAPI) => {
    try {
      const cleanedFilters = { ...filters };
      Object.keys(cleanedFilters).forEach((key) =>
        cleanedFilters[key] === "" ||
        cleanedFilters[key] === null ||
        cleanedFilters[key] === false
          ? delete cleanedFilters[key]
          : null
      );

      const queryParams = new URLSearchParams(cleanedFilters).toString();
      console.log("Query params:", queryParams);

      const response = await axios.get(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?${queryParams}`
      );
      return response.data.items;
    } catch (error) {
      console.error("Error fetching campers:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export default fetchCampers;
