import React, { PureComponent, useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import axios from "../plugins/axios";
import { useTheme } from "@mui/system";

const COLORS = ["#2B5517", "#3DBC00", "#88FA52", "#476B36"];

const ChartC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("ticket/traffic-violation-count/");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredData = data.filter((entry) => entry.value !== 0);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <PieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            fill="#8884d8"
            dataKey="value"
            outerRadius={"100%"}
          >
            {filteredData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="container-label-one"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            marginLeft: "5%",
          }}
        >
          <div style={{ width: "80%" }}>
            {filteredData.map((entry, index) => (
              <div key={`row-${index}`} className="row-container">
                <div className="sub-category">
                  <div
                    className="oval"
                    style={{
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartC;
