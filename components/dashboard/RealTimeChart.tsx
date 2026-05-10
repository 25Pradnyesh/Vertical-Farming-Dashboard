"use client";

import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  data: any[];
}

const RealTimeChart = ({ data }: Props) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[420px]">

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Real-time Data
      </h2>

      <ResponsiveContainer width="100%" height="85%">

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="temperature"
            name="Temperature"
            stroke="#22c55e"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="humidity"
            name="Humidity"
            stroke="#3b82f6"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="soil_moisture"
            name="Soil Moisture"
            stroke="#b45309"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="ph"
            name="pH"
            stroke="#a855f7"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="tds"
            name="TDS"
            stroke="#14b8a6"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>
    </div>
  );
};

export default RealTimeChart;