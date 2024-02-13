import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatusSelection from "./StatusSelection";
import axios from '../plugins/axios';

export default class ChartD extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // Initialize with an empty array
      weeks: [], // Initialize with an empty array for the week options
      selectedWeek: null, // Track the selected week
    };
  }

  componentDidMount() {
    // Fetch data from the API endpoint
    axios.get("ticket/monthly-data/")
      .then((response) => {
        // Extract and format the data as needed
        const formattedData = response.data.weekly_data.map((weeklyItem) => {
          const weekName = weeklyItem[0];
          const daysData = weeklyItem[1];
          const total = daysData.reduce((acc, day) => acc + day[1], 0);

          return {
            name: weekName, // Assuming weekName is the desired label
            total: total,
          };
        });

        // Extract week names for the StatusSelection component
        const weekNames = response.data.weekly_data.map((weeklyItem) => weeklyItem[0]);

        // Update the component's state with the new data and week options
        this.setState({ data: formattedData, weeks: weekNames });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  handleStatusChange = (selectedWeek) => {
    // Update the selected week in the state
    this.setState({ selectedWeek });
  };

  render() {
    const { data, selectedWeek, weeks } = this.state;

    // Filter data based on the selected week
    const filteredData = selectedWeek
      ? data.filter((item) => item.name === selectedWeek)
      : data;

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <div
          style={{
            width: 30,
            marginLeft: 79,
            marginTop: -2,
            marginBottom: 10,
            display: "flex",
          }}
        >

        </div>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart
            width={500}
            height={300}
            data={filteredData} // Use the filtered data for the bar chart
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={40}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 30, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="total" fill="#3E7C1F" background={{ fill: "#eee" }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
