import { createContext, useContext, useReducer, useEffect } from 'react';
import { generateId, initData } from '../utils/data';

const DataCtx = createContext({});

function dataReducer(state, action) {
  const log = (msg) => ({ id: generateId("LOG"), action: msg, timestamp: new Date().toISOString() });
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return { ...state, employees: [...state.employees, action.payload], activityLogs: [log(`Employee ${action.payload.name} was added`), ...state.activityLogs] };
    case "UPDATE_EMPLOYEE":
      return { ...state, employees: state.employees.map(e => e.id === action.payload.id ? action.payload : e), activityLogs: [log(`Employee ${action.payload.name} updated`), ...state.activityLogs] };
    case "DELETE_EMPLOYEE":
      const emp = state.employees.find(e => e.id === action.payload);
      return { ...state, employees: state.employees.filter(e => e.id !== action.payload), activityLogs: [log(`Employee ${emp?.name} removed`), ...state.activityLogs] };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload], activityLogs: [log(`Task "${action.payload.title}" assigned`), ...state.activityLogs] };
    case "UPDATE_TASK":
      return { ...state, tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t) };
    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    case "SET_TASK_STATUS":
      return { ...state, tasks: state.tasks.map(t => t.id === action.payload.id ? { ...t, status: action.payload.status } : t), activityLogs: [log(`Task status updated to ${action.payload.status}`), ...state.activityLogs] };
    case "ADD_LEAVE":
      return { ...state, leaves: [...state.leaves, action.payload], activityLogs: [log("Leave request submitted"), ...state.activityLogs] };
    case "UPDATE_LEAVE_STATUS":
      return { ...state, leaves: state.leaves.map(l => l.id === action.payload.id ? { ...l, status: action.payload.status } : l), activityLogs: [log(`Leave ${action.payload.status.toLowerCase()}`), ...state.activityLogs] };
    case "MARK_ATTENDANCE":
      const existing = (state.attendance || []).filter(a => !(a.date === action.payload.date && action.payload.records.find(r => r.employeeId === a.employeeId)));
      return { ...state, attendance: [...existing, ...action.payload.records.map(r => ({ ...r, date: action.payload.date }))], activityLogs: [log(`Attendance marked for ${action.payload.date}`), ...state.activityLogs] };
    case "RATE_EMPLOYEE":
      const ratings = (state.ratings || []).filter(r => r.employeeId !== action.payload.employeeId);
      return { ...state, ratings: [...ratings, { ...action.payload, updatedAt: new Date().toISOString() }], activityLogs: [log(`Performance rating updated`), ...state.activityLogs] };
    default:
      return state;
  }
}

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, null, initData);
  useEffect(() => { localStorage.setItem("staffx_data", JSON.stringify(state)); }, [state]);

  const value = {
    ...state,
    attendance: state.attendance || [],
    ratings: state.ratings || [],
    addEmployee: (d) => dispatch({ type: "ADD_EMPLOYEE", payload: { ...d, id: generateId("EMP"), avatarColor: "#7c3aed" } }),
    updateEmployee: (e) => dispatch({ type: "UPDATE_EMPLOYEE", payload: e }),
    deleteEmployee: (id) => dispatch({ type: "DELETE_EMPLOYEE", payload: id }),
    addTask: (d) => dispatch({ type: "ADD_TASK", payload: { ...d, id: generateId("TASK"), createdAt: new Date().toISOString() } }),
    updateTask: (t) => dispatch({ type: "UPDATE_TASK", payload: t }),
    deleteTask: (id) => dispatch({ type: "DELETE_TASK", payload: id }),
    setTaskStatus: (id, status) => dispatch({ type: "SET_TASK_STATUS", payload: { id, status } }),
    addLeave: (d) => dispatch({ type: "ADD_LEAVE", payload: { ...d, id: generateId("LV"), status: "Pending", appliedOn: new Date().toISOString().split("T")[0] } }),
    updateLeaveStatus: (id, status) => dispatch({ type: "UPDATE_LEAVE_STATUS", payload: { id, status } }),
    markAttendance: (date, records) => dispatch({ type: "MARK_ATTENDANCE", payload: { date, records } }),
    rateEmployee: (employeeId, rating, note) => dispatch({ type: "RATE_EMPLOYEE", payload: { employeeId, rating, note } }),
  };

  return <DataCtx.Provider value={value}>{children}</DataCtx.Provider>;
}

export function useData() { return useContext(DataCtx); }
