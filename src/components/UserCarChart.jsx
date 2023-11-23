import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Chart, registerables } from "chart.js";
import "chart.js/auto";

const UserCarChart = () => {
  const currentRide = useSelector((state) => state.rides.currentRide);
  const chartsRef = useRef({}); // Object to store multiple chart instances

  useEffect(() => {
    Chart.register(...registerables);

    // Function to create a line chart
    const createLineChart = (canvasId, label, data, borderColor) => {
      const chartCanvas = document.getElementById(canvasId).getContext("2d");
      chartsRef.current[canvasId] = new Chart(chartCanvas, {
        type: "line",
        data: {
          labels: currentRide.time,
          datasets: [
            {
              label: label,
              data: data,
              borderColor: borderColor,
              tension: 0.1,
            },
          ],
        },
        options: {},
      });
    };

    // Destroy previous chart instances
    Object.values(chartsRef.current).forEach((chart) => chart.destroy());
    chartsRef.current = {};

    // Create line charts for each attribute
    createLineChart(
      "speedChart",
      "Speed",
      currentRide.speed,
      "rgb(75, 192, 192)"
    );
    createLineChart("rpmChart", "RPM", currentRide.rpm, "rgb(192, 75, 75)");
    createLineChart(
      "fuelChart",
      "Fuel Consumption",
      currentRide.fuelConsumption,
      "rgb(75, 75, 192)"
    );
    createLineChart(
      "airTempChart",
      "Air Temperature",
      currentRide.airTemperature,
      "rgb(192, 192, 75)"
    );
    createLineChart(
      "engineTempChart",
      "Engine Temperature",
      currentRide.engineTemperature,
      "rgb(75, 192, 75)"
    );

    // Cleanup function
    return () => {
      Object.values(chartsRef.current).forEach((chart) => chart.destroy());
    };
  }, [currentRide]);

  return (
    <div className="UserCarChart">
      <canvas id="speedChart"></canvas>
      <canvas id="rpmChart"></canvas>
      <canvas id="fuelChart"></canvas>
      <canvas id="airTempChart"></canvas>
      <canvas id="engineTempChart"></canvas>
    </div>
  );
};

export default UserCarChart;
