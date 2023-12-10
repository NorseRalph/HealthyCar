import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart, registerables } from "chart.js";
import "chart.js/auto";
import LoadingComponent from "./LoadingComponent";
import { useParams } from "react-router-dom";
import { fetchLatestRideByCarId } from "../reducers/carSlice";
import ReportGauge from "./ReportGauge";

const UserCarChart = () => {
  const dispatch = useDispatch();
  const { carId } = useParams();
  const { carRide, status, error } = useSelector((state) => state.cars);
  const chartsRef = useRef({});

  useEffect(() => {
    if (carId) {
      dispatch(fetchLatestRideByCarId(carId));
    }
  }, [dispatch, carId]);

  useEffect(() => {
    console.log('Car ride data for charts:', carRide); // Check the carRide data
    if (carRide && carRide.readings && status === 'succeeded' && !error) {
      Chart.register(...registerables);

      const createLineChart = (canvasId, label, data, borderColor) => {
        if (chartsRef.current[canvasId]) {
          console.log(`Destroying chart: ${canvasId}`); // Check if charts are being destroyed
          chartsRef.current[canvasId].destroy();
        }
        const chartCanvas = document.getElementById(canvasId).getContext("2d");
        chartsRef.current[canvasId] = new Chart(chartCanvas, {
          type: "line",
          data: {
            labels: carRide.readings.map((_, index) => `Reading ${index + 1}`),
            datasets: [{ label, data, borderColor, tension: 0.1 }],
          },
          options: {},
        });
        console.log(`Chart created: ${canvasId}`); // Confirm chart creation
      };

      // Create charts for each data type
      createLineChart("speedChart", "Speed", carRide.readings.map(reading => reading.speed), "rgb(75, 192, 192)");
      createLineChart("rpmChart", "RPM", carRide.readings.map(reading => reading.rpm), "rgb(192, 75, 75)");
      createLineChart("fuelChart", "Fuel Consumption", carRide.readings.map(reading => reading.fuelConsumption), "rgb(75, 75, 192)");
      createLineChart("airTempChart", "Air Temperature", carRide.readings.map(reading => reading.airTemperature), "rgb(192, 192, 75)");
      createLineChart("engineTempChart", "Engine Temperature", carRide.readings.map(reading => reading.engineTemperature), "rgb(75, 192, 75)");
    }
  }, [carRide, status, error]); // Ensuring that this effect runs only when these dependencies change

  if (status === 'loading') {
    return <LoadingComponent />;
  }

  if (error) {
    return <div>Error loading ride data: {error}</div>;
  }

  return (
    <div className="UserCarChart">
      <h1 className="header">Latest Rides</h1>
      <canvas id="speedChart" aria-label="Speed Chart" width="400" height="400"></canvas>
      <canvas id="rpmChart" aria-label="RPM Chart" width="400" height="400"></canvas>
      <canvas id="fuelChart" aria-label="Fuel Consumption Chart" width="400" height="400"></canvas>
      <canvas id="airTempChart" aria-label="Air Temperature Chart" width="400" height="400"></canvas>
      <canvas id="engineTempChart" aria-label="Engine Temperature Chart" width="400" height="400"></canvas>
      <h1 className="header">Analyzed Rides</h1>
      <ReportGauge />
    </div>
  );
};

export default UserCarChart;
