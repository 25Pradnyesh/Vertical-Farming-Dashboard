"use client";

import React, { useEffect, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";

import KPICard from "@/components/dashboard/KPICard";
import RealTimeChart from "@/components/dashboard/RealTimeChart";
import AIDiseaseDetection from "@/components/dashboard/AIDiseaseDetection";
import RecentAlerts from "@/components/dashboard/RecentAlerts";
import SensorStatus from "@/components/dashboard/SensorStatus";

import {
  Thermometer,
  Droplet,
  Sprout,
  FlaskConical,
  Droplets,
} from "lucide-react";

export default function DashboardPage() {

  // SENSOR DATA
  const [data, setData] = useState<any>(null);

  // GRAPH DATA
  const [chartData, setChartData] = useState<any[]>([]);

  // LOADING
  const [loading, setLoading] = useState(true);

  // SIDEBAR
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ACTIVE PAGE
  const [activePage, setActivePage] = useState("Dashboard");

  useEffect(() => {

    const fetchData = () => {
      fetch("http://localhost:5000/data")
        .then((res) => res.json())
        .then((sensorData) => {

          setData(sensorData);

          setChartData((prev) => [
            ...prev.slice(-9),
            {
              time: new Date().toLocaleTimeString(),

              temperature: sensorData.temperature,
              humidity: sensorData.humidity,
              soil_moisture: sensorData.soil_moisture,
              ph: sensorData.ph,
              tds: sensorData.tds,
            },
          ]);

          setLoading(false);
        })
        .catch((err) => {
          console.error("Backend Error:", err);
        });
    };

    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);

  }, []);

  // LOADING
  if (loading || !data) {
    return (
      <div className="h-screen flex items-center justify-center text-2xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">

      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* MAIN */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "ml-0"
        }`}
      >

        {/* TOPBAR */}
        <TopNavbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* CONTENT */}
        <main className="flex-1 p-6 lg:p-8">

          <div className="max-w-7xl mx-auto space-y-6">

            {/* HEADER */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Dashboard
              </h2>

              <p className="text-gray-500 mt-1">
                Real-time overview of your farm
              </p>
            </div>

            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

              <KPICard
                title="Temperature"
                value={data.temperature.toString()}
                unit="°C"
                status={data.temperature > 35 ? "High" : "Normal"}
                statusColor={
                  data.temperature > 35
                    ? "text-red-500"
                    : "text-green-500"
                }
                Icon={Thermometer}
                iconColor="text-green-500"
              />

              <KPICard
                title="Humidity"
                value={data.humidity.toString()}
                unit="%"
                status="Normal"
                statusColor="text-green-500"
                Icon={Droplet}
                iconColor="text-blue-500"
              />

              <KPICard
                title="Soil Moisture"
                value={data.soil_moisture.toString()}
                unit="%"
                status={
                  data.soil_moisture < 40
                    ? "Low"
                    : "Normal"
                }
                statusColor={
                  data.soil_moisture < 40
                    ? "text-red-500"
                    : "text-green-500"
                }
                Icon={Sprout}
                iconColor="text-amber-700"
              />

              <KPICard
                title="Soil pH"
                value={data.ph.toString()}
                unit="pH"
                status={
                  data.ph < 6.5
                    ? "Slightly Acidic"
                    : "Normal"
                }
                statusColor={
                  data.ph < 6.5
                    ? "text-purple-500"
                    : "text-green-500"
                }
                Icon={FlaskConical}
                iconColor="text-purple-500"
              />

              <KPICard
                title="TDS"
                value={data.tds.toString()}
                unit="ppm"
                status="Normal"
                statusColor="text-green-500"
                Icon={Droplets}
                iconColor="text-teal-500"
              />

            </div>

            {/* DASHBOARD */}
            {activePage === "Dashboard" && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                  <div className="lg:col-span-2">
                    <RealTimeChart data={chartData} />
                  </div>

                  <div className="lg:col-span-1">
                    <AIDiseaseDetection />
                  </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  <RecentAlerts />

                  <SensorStatus />

                </div>
              </>
            )}

            {/* LIVE DATA */}
            {activePage === "Live Data" && (
              <RealTimeChart data={chartData} />
            )}

            {/* SENSORS */}
            {activePage === "Sensors" && (
              <SensorStatus />
            )}

            {/* AI */}
            {activePage === "AI Detection" && (
              <AIDiseaseDetection />
            )}

            {/* ALERTS */}
            {activePage === "Alerts" && (
              <RecentAlerts />
            )}

          </div>

        </main>

        {/* FOOTER */}
        <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-100 bg-white">
          © 2026 Smart Agriculture System. All rights reserved.
        </footer>

      </div>
    </div>
  );
}