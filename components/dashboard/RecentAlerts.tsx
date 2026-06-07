"use client";

import React from "react";

import {
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const RecentAlerts = ({ data }: any) => {

  const alerts = [];

  // SOIL ALERT
  if (data.soil_moisture < 40) {
    alerts.push({
      title: "Soil Moisture is Low",
      message: "Irrigation recommended",
      color: "text-red-500",
      icon: AlertTriangle,
    });
  }

  // PH ALERT
  if (data.ph < 6.5) {
    alerts.push({
      title: "pH Level is Slightly Low",
      message: "Consider adjusting nutrients",
      color: "text-yellow-500",
      icon: AlertTriangle,
    });
  }

  // TEMP ALERT
  if (data.temperature > 35) {
    alerts.push({
      title: "High Temperature Detected",
      message: "Cooling required",
      color: "text-red-500",
      icon: AlertTriangle,
    });
  }

  // ALL GOOD
  if (alerts.length === 0) {
    alerts.push({
      title: "All parameters are normal",
      message: "Everything is stable",
      color: "text-green-500",
      icon: CheckCircle,
    });
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Recent Alerts
      </h2>

      <div className="space-y-6">

        {alerts.map((alert: any, index) => {

          const Icon = alert.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-4"
            >

              <Icon
                className={`${alert.color} mt-1`}
                size={22}
              />

              <div>

                <h3 className="font-semibold text-gray-900">
                  {alert.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {alert.message}
                </p>

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default RecentAlerts;