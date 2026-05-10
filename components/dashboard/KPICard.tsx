import React from "react";

interface KPICardProps {
  title: string;
  value: string;
  unit: string;
  status: string;
  statusColor: string;
  Icon: any;
  iconColor: string;
}

const KPICard = ({
  title,
  value,
  unit,
  status,
  statusColor,
  Icon,
  iconColor,
}: KPICardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-all">

      {/* ICON */}
      <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
        <Icon className={`w-10 h-10 ${iconColor}`} strokeWidth={2.5} />
      </div>

      {/* CONTENT */}
      <div>
        <div className="flex items-end gap-1">
          <h3 className="text-4xl font-bold text-gray-900 leading-none">
            {value}
          </h3>

          <span className="text-lg font-semibold text-gray-600 mb-1">
            {unit}
          </span>
        </div>

        <p className="text-gray-500 mt-1 text-sm">
          {title}
        </p>

        <p className={`text-sm font-semibold mt-1 ${statusColor}`}>
          {status}
        </p>
      </div>
    </div>
  );
};

export default KPICard;