import { Edit2, Plus, Search, Trash, Trash2 } from "lucide-react";
import React, { useState } from "react";
import RecordModel from "./RecordModel";
import {
  setSearchTerm,
  selectAllRecord,
  selectSearchTerm,
  deleteRecord,
  selectFilteredRecords,
} from "../store/recordSlice.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const RecordTable = () => {
  const dispatch = useDispatch();
  const filteredRecords = useSelector(selectFilteredRecords);
  const allRecord = useSelector(selectAllRecord);
  const searchTerm = useSelector(selectSearchTerm);

  const storedRecord = [...filteredRecords].sort((a, b) => b.id - a.id);
  const [showModel, setShowModel] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const openCreateModel = () => {
    setShowModel(true);
    setCurrentRecord(null);
  };

  const opencreateModel = () => {
    setCurrentRecord(null);
    setShowModel(true);
  };

  const openEditModel = (record) => {
    setCurrentRecord(record);
    setShowModel(true);
  };

  const closeModel = () => {
    setShowModel(false);
    setCurrentRecord(null);
  };

  const handleDelete = (record) => {
    toast(
      (t) => (
        <div className="flex flex-col gap">
          <span>Are you sure you want to delete {record.name}</span>
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1  bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              onClick={() => {
                dispatch(deleteRecord(record.id));
                toast.success("Record deleted successfully");
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity },
    );
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* header */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Employee Management
          </h1>
          <p className="text-gray-600">
            Manage employe records with Redux Toolkit
          </p>
        </div>

        {/* search and add button */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                placeholder="Search by name, email or position"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
              onClick={openCreateModel}
            >
              <Plus size={20} />
              Add New Record
            </button>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Positions
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* conditional rendering */}
                {storedRecord.length === 0 ? (
                  <tr className="px-6 py-12 text-center text-gray-500">
                    <td colSpan={6}>No Record Found</td>
                  </tr>
                ) : (
                  storedRecord.map((record) => (
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                        {record.id}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                        {record.name}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                        {record.email}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                        {record.phone}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                        {record.position}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-all text-sm font-medium"
                            onClick={() => openEditModel(record)}
                          >
                            <Edit2 size={16} />
                            Edit
                          </button>
                          <button
                            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition-all text-sm font-medium"
                            onClick={() => handleDelete(record)}
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* footer showing filtered vs total records */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              showing {storedRecord.length} of {allRecord.length} records
            </p>
          </div>
        </div>
      </div>
      {/* Model */}
      <RecordModel
        isOpen={showModel}
        onClose={closeModel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default RecordTable;
