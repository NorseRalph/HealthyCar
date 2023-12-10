import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart, registerables } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { useParams } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";
import { fetchCarReports } from "../reducers/carReports";

Chart.register(...registerables, annotationPlugin);

const ReportGauge = () => {
  const dispatch = useDispatch();
  const { carId } = useParams();
  const { reports, loading, error } = useSelector((state) => state.carReports);
  const chartRefs = useRef({});

  useEffect(() => {
    if (carId) {
      dispatch(fetchCarReports(carId));
    }
  }, [dispatch, carId]);

  useEffect(() => {
    // Destroy all charts on component unmount to prevent memory leaks
    return () => {
      Object.keys(chartRefs.current).forEach((key) => {
        chartRefs.current[key]?.destroy();
      });
    };
  }, []);

  useEffect(() => {
    if (reports && !loading && !error) {
      reports.forEach((report) => {
        report.groupedSpeedData.forEach((dataItem, index) => {
          dataItem.values.forEach((value, valueIndex) => {
            const chartId = `bar-chart-${dataItem.name}-${index}-${valueIndex}`;
            if (value.lower !== null && value.upper !== null) {
              createBarChart(chartId, value, dataItem.name);
            }
          });
        });
      });
    }
  }, [reports, loading, error]);

  const calculateSections = (lower, upper, avg) => {
    const redWidth = lower - lower * 0.9; // Width for the "Lower - 10%" section
    const greenWidth = avg - lower;
    const blackWidth = avg * 0.01; // Very small width to act as a needle
    const blueWidth = upper - avg;
    const yellowWidth = upper * 1.1 - upper;
    return { redWidth, greenWidth, blackWidth, blueWidth, yellowWidth };
  };

  const createBarChart = (chartElementId, gaugeData, gaugeName) => {
    const ctx = document.getElementById(chartElementId)?.getContext("2d");
    if (ctx) {
      if (chartRefs.current[chartElementId]) {
        chartRefs.current[chartElementId].destroy();
      }

      const { redWidth, greenWidth, blackWidth, blueWidth, yellowWidth } =
        calculateSections(gaugeData.lower, gaugeData.upper, gaugeData.avg);

      chartRefs.current[chartElementId] = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [""], // No label needed on the x-axis
          datasets: [
            {
              label: "Lower - 10%",
              data: [redWidth],
              backgroundColor: "red",
            },
            {
              label: "Lower to Avg",
              data: [greenWidth],
              backgroundColor: "green",
            },
            {
              label: "Avg",
              data: [blackWidth],
              backgroundColor: "black", // This will create a thin line for the average
            },
            {
              label: "Avg to Upper",
              data: [blueWidth],
              backgroundColor: "green",
            },
            {
              label: "Upper + 10%",
              data: [yellowWidth],
              backgroundColor: "yellow",
            },
          ],
        },
        options: {
          indexAxis: "y",
          scales: {
            x: {
              stacked: true,
              beginAtZero: true,
            },
            y: {
              stacked: true,
            },
          },
          plugins: {
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label === "Avg") {
                    // Special tooltip for the average
                    return `Avg: ${gaugeData.avg}`;
                  } else if (context.parsed.x !== null) {
                    label += `: ${context.parsed.x}`;
                  }
                  return label;
                },
              },
            },
            legend: {
              display: false,
            },
          },
        },
      });
    } else {
      console.error(`Canvas context not found for ${chartElementId}`);
    }
  };

  if (loading) return <LoadingComponent />;
  if (error) return <div>Error loading reports: {error}</div>;

  return (
    <div className="report-gauge">
      {reports &&
        reports.map((report, reportIndex) =>
          report.groupedSpeedData.map((dataItem, dataIndex) =>
            dataItem.values.map((value, valueIndex) => (
              <div
                key={`${reportIndex}-${dataIndex}-${valueIndex}`}
                className="report-gauge__container">
                <h3 className="report-gauge__header">
                  {`${dataItem.name} (${value.speedStart}-${value.speedEnd} km/h)`}
                </h3>

                <canvas
                  id={`bar-chart-${dataItem.name}-${dataIndex}-${valueIndex}`}
                  width="400"
                  height="150"
                />
              </div>
            ))
          )
        )}
    </div>
  );
};

export default ReportGauge;
