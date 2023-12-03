import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart, registerables } from "chart.js";
import "chart.js/auto";
import LoadingComponent from "./LoadingComponent";
import { fetchFirstRide } from "../reducers/carSlice";
import store from "../store/store";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams

const UserCarChart = () => {
  const dispatch = useDispatch();
  const { carId } = useParams();
  const firstRideData = useSelector((state) => state.cars.firstRide);
  const chartsRef = useRef({});

  useEffect(() => {
    if (carId) {
      dispatch(fetchFirstRide(carId)); // Pass the carId to the fetchFirstRide action
    }
  }, [dispatch, carId]); // Add carId as a dependency

  useEffect(() => {
    console.log("Redux State:", store.getState());
    if (firstRideData) {
      Chart.register(...registerables);

      const createLineChart = (canvasId, label, data, borderColor) => {
        if (chartsRef.current[canvasId]) {
          chartsRef.current[canvasId].destroy();
        }
        const chartCanvas = document.getElementById(canvasId).getContext("2d");
        chartsRef.current[canvasId] = new Chart(chartCanvas, {
          type: "line",
          data: {
            labels: firstRideData.time,
            datasets: [
              {
                label,
                data,
                borderColor,
                tension: 0.1,
              },
            ],
          },
          options: {},
        });
      };

      createLineChart(
        "speedChart",
        "Speed",
        firstRideData.speed,
        "rgb(75, 192, 192)"
      );
      createLineChart("rpmChart", "RPM", firstRideData.rpm, "rgb(192, 75, 75)");
      createLineChart(
        "fuelChart",
        "Fuel Consumption",
        firstRideData.fuelConsumption,
        "rgb(75, 75, 192)"
      );
      createLineChart(
        "airTempChart",
        "Air Temperature",
        firstRideData.airTemperature,
        "rgb(192, 192, 75)"
      );
      createLineChart(
        "engineTempChart",
        "Engine Temperature",
        firstRideData.engineTemperature,
        "rgb(75, 192, 75)"
      );

      const currentChartsRef = chartsRef.current;
      return () => {
        Object.values(currentChartsRef).forEach((chart) => chart?.destroy());
      };
    }
  }, [firstRideData]);

  if (!firstRideData) {
    return <LoadingComponent />;
  }
  
  return (
    <div className="UserCarChart">
      <canvas id="speedChart" aria-label="Speed Chart"></canvas>
      <canvas id="rpmChart" aria-label="RPM Chart"></canvas>
      <canvas id="fuelChart" aria-label="Fuel Consumption Chart"></canvas>
      <canvas id="airTempChart" aria-label="Air Temperature Chart"></canvas>
      <canvas
        id="engineTempChart"
        aria-label="Engine Temperature Chart"></canvas>
    </div>
  );
};

export default UserCarChart;
