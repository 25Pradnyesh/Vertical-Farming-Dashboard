"use client";

import React from "react";
import Image from "next/image";

const AIDiseaseDetection = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        AI Disease Detection
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* IMAGE */}
        <div className="w-56 h-56 relative rounded-2xl overflow-hidden border">

          <Image
            src="/leaf.jpg"
            alt="Leaf Disease"
            fill
            className="object-cover"
          />

        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-4">

          <div>
            <p className="text-gray-500 text-sm">
              Disease Detected
            </p>

            <h3 className="text-4xl font-bold text-red-600">
              Leaf Spot
            </h3>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Confidence
            </p>

            <h3 className="text-3xl font-bold text-green-600">
              92.6%
            </h3>
          </div>

          <div>
            <p className="text-gray-500 text-sm mb-1">
              Recommendation
            </p>

            <p className="text-gray-700 leading-relaxed max-w-md">
              Remove affected leaves and apply suitable fungicide.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AIDiseaseDetection;