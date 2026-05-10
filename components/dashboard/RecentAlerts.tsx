import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

const alerts = [
  {
    id: 1,
    title: 'Soil Moisture is Low',
    description: 'Irrigation recommended',
    time: '10:28 AM',
    type: 'critical',
    Icon: AlertTriangle,
  },
  {
    id: 2,
    title: 'pH Level is Slightly Low',
    description: 'Consider adding lime to soil',
    time: '10:15 AM',
    type: 'warning',
    Icon: AlertCircle,
  },
  {
    id: 3,
    title: 'All parameters are normal',
    description: 'Everything is in good condition',
    time: '09:55 AM',
    type: 'success',
    Icon: CheckCircle,
  },
];

const RecentAlerts = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Alerts</h3>
      
      <div className="flex flex-col gap-4 flex-1">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex gap-4 items-start">
            <div className={`mt-1 flex-shrink-0 ${
              alert.type === 'critical' ? 'text-red-500' :
              alert.type === 'warning' ? 'text-amber-500' :
              'text-green-500'
            }`}>
              <alert.Icon className="w-6 h-6" fill="currentColor" stroke="white" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900">{alert.title}</h4>
              <p className="text-sm text-gray-500">{alert.description}</p>
            </div>
            <span className="text-xs text-gray-400 font-medium whitespace-nowrap mt-1">
              {alert.time}
            </span>
          </div>
        ))}
      </div>
      
        </div>
  );
};

export default RecentAlerts;
