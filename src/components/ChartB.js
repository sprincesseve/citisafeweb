import React, { PureComponent } from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Driving without Driver’s License', value: 40 },
  { name: 'Driving with SP Only', value: 30 },
  { name: 'ailure to carry Driver’s License', value: 23 },
  { name: 'Expired Driver’s License', value: 34 },
  { name: 'Expired Registration', value: 23 },
  { name: 'Unregistered Motor Vehicle', value: 0 },
  { name: 'Plates not firmly attached and visible', value: 20 },
  { name: 'No Early Warning Device', value: 22 },
  { name: 'Operating without Mayor’s Permit', value: 21 },
  { name: 'Overloading', value: 10 },
  { name: 'Unsafe load', value: 4 },
  { name: 'Colorum Operation', value: 0 },
  { name: 'No Franchise', value: 40 },
  { name: 'Double Parking', value: 45 },
  { name: 'Parked at No Parking Sign', value: 25 },
  { name: 'Arrogance of discoutesy', value: 56 },
  { name: 'Disregarding Traffic Officer', value: 45 },
  { name: 'Disregarding Traffic Sign', value: 34 },
  { name: 'Failure to Dim Headlights', value: 23 },
  { name: 'No Helmet when Driving', value: 0 },
  { name: 'Obstruction to Traffic', value: 20 },
  { name: 'Over Speeding', value: 12 },
  { name: 'Reckless Driving', value: 23 },
  { name: 'No Canvass Cover', value: 45 },
  { name: 'Violation of No Entry Sign', value: 12 },
  { name: 'Noise Muffler', value: 11 },
  { name: 'Refusal to convey passenger to proper dstn.', value: 2 },
  
];

export default class ChartB extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-in-responsive-container-qyv6t';

  render() {
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} fill="#7D8ECC" label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
