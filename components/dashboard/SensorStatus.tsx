import React from 'react';
import { CheckCircle } from 'lucide-react';

const sensors = [
  { name: 'Temperature & Humidity', status: 'Active' },
  { name: 'Soil Moisture', status: 'Active' },
  { name: 'pH Sensor', status: 'Active' },
  { name: 'TDS Sensor', status: 'Active' },
];

const SensorStatus = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Sensor Status</h3>
      
      <div className="flex flex-col gap-3 flex-1">
        {sensors.map((sensor, index) => (
          <React.Fragment key={sensor.name}>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm font-medium text-gray-700">{sensor.name}</span>
              <span className="text-xs font-semibold px-2 py-1 bg-green-50 text-green-600 rounded-md">
                {sensor.status}
              </span>
            </div>
            {index < sensors.length - 1 && (
              <div className="w-full h-px bg-gray-100"></div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-green-600">
        <CheckCircle className="w-4 h-4" />
        <span className="text-sm font-medium">All Systems Operational</span>
      </div>
    </div>
  );
};

export default SensorStatus;
