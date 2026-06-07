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
  Waves,
} from "lucide-react";

import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";

export default function DashboardPage() {

  const [data, setData] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");

  useEffect(() => {

    const sensorRef = ref(database);

    onValue(sensorRef, (snapshot) => {

      const firebaseData = snapshot.val();

      if (!firebaseData) return;

      const sensorData = {
        temperature: firebaseData.Temperature?.value || 0,
        humidity: firebaseData.Humidity?.value || 0,
        soil_moisture: firebaseData.Moisture?.value || 0,
        ph: firebaseData.PH?.value || 0,
        tds: firebaseData.TDS?.value || 0,
        pump: firebaseData.Pump?.status || "OFF",
      };

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

    });

  }, []);

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

  {/* TEMPERATURE */}
  <KPICard
    title="Temperature"
    value={data.temperature.toString()}
    unit="°C"

    status={
      data.temperature < 18
        ? "Low"
        : data.temperature > 30
        ? "High"
        : "Normal"
    }

    statusColor={
      data.temperature < 18
        ? "text-blue-500"
        : data.temperature > 30
        ? "text-red-500"
        : "text-green-500"
    }

    Icon={Thermometer}
    iconColor="text-green-500"
  />

  {/* HUMIDITY */}
  <KPICard
    title="Humidity"
    value={data.humidity.toString()}
    unit="%"

    status={
      data.humidity < 40
        ? "Low"
        : data.humidity > 70
        ? "High"
        : "Normal"
    }

    statusColor={
      data.humidity < 40
        ? "text-yellow-500"
        : data.humidity > 70
        ? "text-red-500"
        : "text-green-500"
    }

    Icon={Droplet}
    iconColor="text-blue-500"
  />

  {/* SOIL MOISTURE */}
  <KPICard
    title="Soil Moisture"
    value={data.soil_moisture.toString()}
    unit="%"

    status={
      data.soil_moisture < 30
        ? "Low"
        : data.soil_moisture > 70
        ? "High"
        : "Normal"
    }

    statusColor={
      data.soil_moisture < 30
        ? "text-yellow-500"
        : data.soil_moisture > 70
        ? "text-red-500"
        : "text-green-500"
    }

    Icon={Sprout}
    iconColor="text-amber-700"
  />

  {/* SOIL PH */}
  <KPICard
    title="Soil pH"
    value={Number(data.ph).toFixed(1)}
    unit="pH"

    status={
      data.ph < 5.5
        ? "Acidic"
        : data.ph > 6.5
        ? "Basic"
        : "Neutral"
    }

    statusColor={
      data.ph < 5.5
        ? "text-red-500"
        : data.ph > 6.5
        ? "text-blue-500"
        : "text-green-500"
    }

    Icon={FlaskConical}
    iconColor="text-purple-500"
  />

  {/* TDS */}
  <KPICard
    title="TDS"
    value={Math.round(data.tds).toString()}
    unit="ppm"

    status={
      data.tds < 300
        ? "Low"
        : data.tds > 800
        ? "High"
        : "Normal"
    }

    statusColor={
      data.tds < 300
        ? "text-yellow-500"
        : data.tds > 800
        ? "text-red-500"
        : "text-green-500"
    }

    Icon={Droplets}
    iconColor="text-cyan-500"
  />

</div>

            {/* DASHBOARD */}
            {activePage === "Dashboard" && (

              <>
              
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                  {/* GRAPH */}
                  <div className="lg:col-span-2">
                    <RealTimeChart data={chartData} />
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="lg:col-span-1 space-y-4">

                    <AIDiseaseDetection />

                    {/* WATER PUMP */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

                      <div className="flex items-center gap-4">

                        <div className="bg-cyan-50 p-3 rounded-xl">
                          <Waves className="text-cyan-500 w-8 h-8" />
                        </div>

                        <div>

                          <h3 className="text-lg font-semibold text-gray-800">
                            Water Pump
                          </h3>

                          <p
                            className={`font-bold text-lg ${
                              data.pump === "ON"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {data.pump === "ON"
                              ? "Running"
                              : "Stopped"}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                {/* ALERTS + SENSOR STATUS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  <RecentAlerts data={data} />

                  <SensorStatus data={data} />

                </div>

              </>

            )}

            {/* LIVE DATA */}
            {activePage === "Live Data" && (
              <RealTimeChart data={chartData} />
            )}

            {/* SENSORS */}
            {activePage === "Sensors" && (
              <SensorStatus data={data} />
            )}

            {/* AI */}
            {activePage === "AI Detection" && (
              <AIDiseaseDetection />
            )}

            {/* ALERTS */}
            {activePage === "Alerts" && (
              <RecentAlerts data={data} />
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

