import React from "react";

export const Progress = ({ value, className }) => {
  return (
    <div className={`w-full h-3 bg-gray-200 rounded ${className}`}>
      <div
        className="h-3 bg-green-500 rounded"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};
