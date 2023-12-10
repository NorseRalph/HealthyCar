import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import baseUrl from "../components/baseUrl";

export const fetchCarReports = createAsyncThunk(
  "carReports/fetchCarReports",
  async (carId, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}reports/car/${carId}`);

      if (!response.ok) {
        throw new Error("Server responded with an error!");
      }

      const carReports = await response.json();

      const modifiedReports = carReports.map((report) => {
        const isoDate = new Date(
          report.date[0], // year
          report.date[1] - 1, // month index (0-based)
          report.date[2], // day
          report.date[3], // hour
          report.date[4], // minute
          report.date[5] // second
        ).toISOString();

        // Process groupedSpeedData
        const processedSpeedData = report.groupedSpeedData.map((dataItem) => ({
          ...dataItem,
          values: dataItem.values.map((value) => ({
            ...value,
            // Concatenate name with speed range
            dataString: `${dataItem.name} ${value.speedStart} to ${value.speedEnd}`,
          })),
        }));

        // Return the modified report with the date as an ISO string and processed speed data
        return {
          ...report,
          date: isoDate,
          groupedSpeedData: processedSpeedData,
        };
      });

      return modifiedReports;
    } catch (error) {
      console.error("Fetch car reports failed", error);
      return thunkAPI.rejectWithValue(error.message || "Unknown server error");
    }
  }
);

export const carReportsSlice = createSlice({
  name: "carReports",
  initialState: {
    reports: null, // Initialize as an empty array
    loading: false,
    error: null,
  },
  reducers: {
    // Reducer logic here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCarReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchCarReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export default carReportsSlice.reducer;
