"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

const SensorStatus = ({ data }: any) => {

  const sensors = [
    {
      name: "Temperature & Humidity",
      active:
        data.temperature > 0 &&
        data.humidity > 0,
    },

    {
      name: "Soil Moisture",
      active: data.soil_moisture > 0,
    },

    {
      name: "pH Sensor",
      active: data.ph > 0,
    },

    {
      name: "TDS Sensor",
      active: data.tds > 0,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Sensor Status
      </h2>

      <div className="space-y-5">

        {sensors.map((sensor, index) => (

          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-100 pb-4"
          >

            <span className="text-gray-700 font-medium">
              {sensor.name}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                sensor.active
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {sensor.active ? "Active" : "Offline"}
            </span>

          </div>
        ))}

      </div>

      <div className="flex items-center justify-center gap-2 mt-6 text-green-600 font-medium">

        <CheckCircle size={18} />

        <span>
          Live Monitoring Active
        </span>

      </div>
    </div>
  );
};

export default SensorStatus;