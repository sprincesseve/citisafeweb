import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from '../plugins/axios';

export default class Example extends PureComponent {
  state = {
    opacity: {
      total: 1,
    },
    ticketData: [],
  };

  componentDidMount() {
    axios
      .get("ticket/ticket-data/")
      .then((response) => {
        const { by_month } = response.data;
        const ticketData = Object.entries(by_month).map(([name, total]) => ({
          name,
          total,
        }));
        this.setState({ ticketData });
      })
      .catch((error) => {
        console.error("Error fetching ticket data:", error);
      });
  }

  handleMouseEnter = (o) => {
    const { dataKey } = o;
    const { opacity } = this.state;

    this.setState({
      opacity: { ...opacity, [dataKey]: 1 },
    });
  };

  handleMouseLeave = (o) => {
    const { dataKey } = o;
    const { opacity } = this.state;

    this.setState({
      opacity: { ...opacity, [dataKey]: 1 },
    });
  };

  render() {
    const { opacity, ticketData } = this.state;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={300}
          data={ticketData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#3E7C1F"
            fill="#3E7C1F"
            fillOpacity={opacity.total}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
