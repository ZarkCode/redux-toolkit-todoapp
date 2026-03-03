import { X } from "lucide-react";
import React from "react";

const RecordModel = () => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
        {/* header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Register New Record
          </h2>
          <button className="text-gray-400 hover:text-gray-600 transition-all">
            <X size={24} />
          </button>
        </div>
        {/* form Fields */}
        <div className="p-6 space-y-4">
          {/* name */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Name:
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* email */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Phone:
            </label>
            <input
              type="number"
              placeholder="Enter full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* position */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Position:
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* footer buttons */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
            <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium">
                Cancel
            </button>
            <button className="flex-1 px-4 py-2 border bg-blue-600 text-white border-gray-300 rounded-lg transition-all font-medium">
                Register
            </button>
        </div>
      </div>
    </div>
  );
};

export default RecordModel;
