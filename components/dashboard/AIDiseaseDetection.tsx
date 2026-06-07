"use client";

import React, { useState } from "react";

const AIDiseaseDetection = () => {

  const [imageUrl, setImageUrl] =
    useState("/leaf.jpg");

  const [message, setMessage] =
    useState("");

  const [disease, setDisease] =
    useState("Waiting...");

  const [confidence, setConfidence] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  // ====================================
  // RUN ANALYSIS
  // ====================================
  const runAnalysis = async () => {

    try {

      setLoading(true);

      // CLEAR OLD DATA
      setDisease("Waiting...");

      setConfidence(0);

      setMessage("");

      // ==============================
      // TRIGGER ESP32
      // ==============================
      const triggerResponse =
        await fetch(
          "http://10.205.251.152/capture"
        );

      const triggerData =
        await triggerResponse.json();

      console.log(triggerData);

      // ==============================
      // START POLLING
      // ==============================
      const interval = setInterval(
        async () => {

          const response =
            await fetch(
              "http://10.205.251.245:5000/latest-result",
              {
                cache: "no-store"
              }
            );

          const data =
            await response.json();

          console.log(data);

          // WAIT UNTIL REAL RESULT EXISTS
          if (
            data.image_url &&
            data.confidence > 0
          ) {

            // UPDATE UI
            setDisease(
              data.disease
            );

            setConfidence(
              data.confidence
            );

            setMessage(
              data.message
            );

            // FORCE IMAGE REFRESH
            setImageUrl(
              `${data.image_url}?t=${Date.now()}`
            );

            setLoading(false);

            clearInterval(interval);
          }

        },
        1000
      );

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  // ====================================
  // RECOMMENDATION
  // ====================================
  const recommendation =
    disease === "Healthy"
      ? "Plant is healthy."
      : disease === "Fungal"
      ? "Apply fungicide."
      : disease === "Yellow Leaf"
      ? "Increase nutrients."
      : disease === "Plant Not Detected"
      ? "Place the leaf properly."
      : "Waiting for AI analysis.";

  return (

    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        AI Disease Detection
      </h2>

      <div className="flex flex-col gap-6">

        {/* IMAGE */}
        <div className="w-full h-64 relative rounded-2xl overflow-hidden border">

          <img
            src={imageUrl}
            alt="Leaf Disease"
            className="w-full h-full object-cover"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={runAnalysis}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >

          {
            loading
              ? "Running Analysis..."
              : "Run Analysis"
          }

        </button>

        {/* DETAILS */}
        <div className="bg-gray-100 p-4 rounded-xl">

          <h1 className="text-green-700 font-bold mb-2">
            Details:
          </h1>

          <p className="text-sm text-gray-700 whitespace-pre-line">
            {message}
          </p>

        </div>

        {/* EXTRA INFO */}
        <div className="space-y-2">

          <h2 className="text-xl font-bold">
            {disease}
          </h2>

          <p>
            Confidence:
            {" "}
            {confidence}%
          </p>

          <p>
            {recommendation}
          </p>

        </div>

      </div>

    </div>
  );
};

export default AIDiseaseDetection;