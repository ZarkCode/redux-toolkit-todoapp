import { createSlice } from "@reduxjs/toolkit";

const demoRecords = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    position: "Manager",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "234-567-8901",
    position: "Developer",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "345-678-9012",
    position: "Designer",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "456-789-0123",
    position: "HR Executive",
  },
];

// load records for local storage or use demo data
const loadRecordsFromStorage = () => {
  try {
    const savedRecords = localStorage.getItem("employeeRecords");
    return savedRecords ? JSON.parse(savedRecords) : demoRecords;
  } catch (error) {
    console.error("Error loading records", err);
  }
};

// calculate next id based on exisiting records
const calculateNextId = (records) => {
  if (!records || records.length === 0) return 1;
  return Math.max(...(records.map((r) => r.id) + 1));
};

const recordsSlice = createSlice({
  name: "records",
  initialState: {
    items: loadRecordsFromStorage(),
    searchTerm: "",
    nextId: calculateNextId(loadRecordsFromStorage()),
  },

  reducers: {
    // add new record
    addRecord: (state, action) => {
      const newRecord = { id: state.nextId, ...action.payload };
      state.items.push(newRecord);

      localStorage.setItem("employeeRecords", JSON.stringify(state.items));
      state.nextId = calculateNextId(state.items);
    },

    // update record
    updateRecord: (state, action) => {
      const { id, data } = action.payload;
      const index = state.items.findIndex((r) => r.id === id);

      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...data };
        localStorage.setItem("employeeRecords", JSON.stringify(state.items));
      }
    },

    // delete record
    deleteRecord: (state, action) => {
      state.items = state.items.filter((r) => r.id !== action.payload);
      localStorage.setItem("employeeRecord", JSON.stringify(state.items));
      state.nextId = calculateNextId(state.items);
    },

    // search record
    setSeaechTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    resetAllRecords: (state) => {
      state.items = demoRecords;
      state.nextId = calculateNextId(demoRecords);
      localStorage.setItem("employeeRecord", JSON.stringify(demoRecords));
    },
  },
});

export const {
  addRecord,
  updateRecord,
  deleteRecord,
  setSeaechTerm,
  resetAllRecords,
} = recordsSlice.actions;

// selectors
export const selectAllRecord = (state) => state.records.items;
export const selectSearchTerm = (state) => state.records.searchTerm;

export const selectFilteredRecords = (state) => {
  const term = state.records.searchTerm.toLowerCase();
  return state.records.items.filter(
    (r) =>
      r.name.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term) ||
      r.position.toLowerCase().includes(term),
  );
};
export default recordsSlice.reducer;
