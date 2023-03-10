import React, { useState } from "react";

import Navbar from "./Navbar";
import LineChart from "./LineChart";
import { useGlobalContext } from "../context";

export default function Summary() {
  const {
    state: { transactions },
  } = useGlobalContext();
  function getDateSections(sectionData) {
    sectionData.sort((a, b) => {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.datetime) - new Date(a.datetime);
    });
    // retrieving an array of unique dates
    const sectionHeaders = Array.from(
      new Set(
        sectionData.map((item) => new Date(item.datetime).toLocaleDateString())
      )
    );

    // creating an array of objects with date as header and empty data array
    const sections = [];
    sectionHeaders.forEach((header) => {
      sections.push({ header: header, data: [] });
    });

    // adding itinerary items to the correct section
    sectionData.forEach((item) => {
      const date = new Date(item.datetime).toLocaleDateString();

      sections.forEach((section) => {
        if (section.header === date) section.data.push(item);
      });
    });
    return sections;
  }
  const [chartData, setChartData] = useState();
  React.useEffect(() => {
    if (!transactions) return;
    const sectionedData = getDateSections(transactions);
    console.log(sectionedData);
    setChartData({
      labels: sectionedData.map((data) => data.header),
      datasets: [
        {
          label: "Spent",
          data: sectionedData.map((section) =>
            section.data.reduce((a, b) => a + b.amount, 0)
          ),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [transactions]);

  return <div>{chartData && <LineChart chartData={chartData} />}</div>;
}
