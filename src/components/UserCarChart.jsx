import React from "react";
import { useSelector } from "react-redux";
import { Chart, registerables } from "chart.js";
import "chart.js/auto";
import { useEffect, useRef } from "react";

const UserCarChart = () => {
  const currentRide = useSelector((state) => state.rides.currentRide);
  const lineChartRef = useRef(null); // Ref for storing the chart instance
  const barChartRef = useRef(null); // Ref for storing the chart instance
  const allRides = useSelector((state) => state.rides.allRides); // Assuming you have a selector for all rides

  // Function to calculate average values for all rides
  const calculateAverages = (rides) => {
    const averages = {
      speed: 0,
      rpm: 0,
      fuelConsumption: 0,
      airTemperature: 0,
      engineTemperature: 0,
    };
    const rideCount = rides.length;

    rides.forEach((ride) => {
      averages.speed +=
        ride.speed.reduce((a, b) => a + b, 0) / ride.speed.length;
      averages.rpm += ride.rpm.reduce((a, b) => a + b, 0) / ride.rpm.length;
      averages.fuelConsumption +=
        ride.fuelConsumption.reduce((a, b) => a + b, 0) /
        ride.fuelConsumption.length;
      averages.airTemperature +=
        ride.airTemperature.reduce((a, b) => a + b, 0) /
        ride.airTemperature.length;
      averages.engineTemperature +=
        ride.engineTemperature.reduce((a, b) => a + b, 0) /
        ride.engineTemperature.length;
    });

    // Calculate the averages
    for (let key in averages) {
      averages[key] = averages[key] / rideCount;
    }

    return averages;
  };

  useEffect(() => {
    Chart.register(...registerables);

    // Destroy the previous chart instances before creating new ones
    if (lineChartRef.current) {
      lineChartRef.current.destroy();
    }
    if (barChartRef.current) {
      barChartRef.current.destroy();
    }

    const lineData = {
      labels: currentRide.time,
      datasets: [
        {
          label: "Speed",
          data: currentRide.speed,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: "RPM",
          data: currentRide.rpm,
          borderColor: "rgb(192, 75, 75)",
          tension: 0.1,
        },
        {
          label: "Fuel Consumption",
          data: currentRide.fuelConsumption,
          borderColor: "rgb(75, 75, 192)",
          tension: 0.1,
        },
        {
          label: "Air Temperature",
          data: currentRide.airTemperature,
          borderColor: "rgb(192, 192, 75)",
          tension: 0.1,
        },
        {
          label: "Engine Temperature",
          data: currentRide.engineTemperature,
          borderColor: "rgb(75, 192, 75)",
          tension: 0.1,
        },
      ],
    };

    const lineConfig = {
      type: "line",
      data: lineData,
      options: {},
    };

    // Calculate averages for the bar chart
    const averages = calculateAverages(allRides);

    // Bar chart data for averages across all rides
    const barData = {
      labels: [
        "Speed",
        "RPM",
        "Fuel Consumption",
        "Air Temperature",
        "Engine Temperature",
      ],
      datasets: [
        {
          label: "Average",
          data: [
            averages.speed,
            averages.rpm,
            averages.fuelConsumption,
            averages.airTemperature,
            averages.engineTemperature,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const barConfig = {
      type: "bar",
      data: barData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const lineChartCanvas = document
      .getElementById("lineUserCarChart")
      .getContext("2d");
    lineChartRef.current = new Chart(lineChartCanvas, lineConfig);

    const barChartCanvas = document
      .getElementById("barUserCarChart")
      .getContext("2d");
    barChartRef.current = new Chart(barChartCanvas, barConfig);

    // Cleanup function to destroy the charts when the component unmounts
    return () => {
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
      }
      if (barChartRef.current) {
        barChartRef.current.destroy();
      }
    };
  }, [currentRide, allRides]); // Add allRides as a dependency

  return (
    <div className="UserCarChart">
      <canvas id="lineUserCarChart"></canvas>
      <canvas id="barUserCarChart"></canvas>
    </div>
  );
};

export default UserCarChart;
