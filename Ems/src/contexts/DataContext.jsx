import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { employeeAPI } from '../api/employee.api';
import { taskAPI } from '../api/task.api';
import { leaveAPI } from '../api/leave.api';
import { attendanceAPI } from '../api/attendance.api';
import { activityAPI } from '../api/dashboard.api';
import { useAuth } from './AuthContext';

const DataCtx = createContext({});

export function DataProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.role === 'hr';

  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const normalize = (arr) =>
    (arr || []).map((item) => ({
      ...item,
      id: item._id?.toString() || item.id,
      assignedTo: item.assignedTo?._id?.toString() || item.assignedTo,
      employeeId: item.employeeId?._id?.toString() || item.employeeId,
    }));

  const normalizeEmployees = (arr) =>
    (arr || []).map((emp) => ({ ...emp, id: emp._id?.toString() || emp.id }));

  const loadAll = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const [empRes, taskRes, attRes] = await Promise.all([
        employeeAPI.getAll(),
        taskAPI.getAll(),
        attendanceAPI.getAll(),
      ]);
      setEmployees(normalizeEmployees(empRes.data.data));
      setTasks(normalize(taskRes.data.data));
      setAttendance(attRes.data.data || []);

      if (isAdmin) {
        const [actRes, leaveRes] = await Promise.all([
          activityAPI.getAll({ limit: 50 }),
          leaveAPI.getAll(),
        ]);
        setActivityLogs(actRes.data.data || []);
        setLeaves(normalize(leaveRes.data.data));
      } else {
        const leaveRes = await leaveAPI.getMy();
        setLeaves(normalize(leaveRes.data.data));
      }
    } catch (err) {
      console.error('DataContext load error:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, isAdmin]);

  useEffect(() => { loadAll(); }, [loadAll]);

  const refreshActivities = async () => {
    if (!isAdmin) return;
    try {
      const res = await activityAPI.getAll({ limit: 50 });
      setActivityLogs(res.data.data || []);
    } catch {}
  };

  const addEmployee = async (data) => {
    const res = await employeeAPI.create(data);
    const emp = normalizeEmployees([res.data.data])[0];
    setEmployees((prev) => [emp, ...prev]);
    await refreshActivities();
    return emp;
  };

  const updateEmployee = async (empData) => {
    const { id, _id, ...rest } = empData;
    const res = await employeeAPI.update(id || _id, rest);
    const updated = normalizeEmployees([res.data.data])[0];
    setEmployees((prev) => prev.map((e) => e.id === updated.id ? updated : e));
    await refreshActivities();
    return updated;
  };

  const deleteEmployee = async (id) => {
    await employeeAPI.delete(id);
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    await refreshActivities();
  };

  const rateEmployee = async (employeeId, rating, note) => {
    const res = await employeeAPI.rate(employeeId, rating, note);
    const updated = normalizeEmployees([res.data.data])[0];
    setEmployees((prev) => prev.map((e) => e.id === updated.id ? updated : e));
    await refreshActivities();
  };

  const addTask = async (data) => {
    const res = await taskAPI.create(data);
    const task = normalize([res.data.data])[0];
    setTasks((prev) => [task, ...prev]);
    await refreshActivities();
    return task;
  };

  const updateTask = async (taskData) => {
    const { id, _id, ...rest } = taskData;
    const res = await taskAPI.update(id || _id, rest);
    const updated = normalize([res.data.data])[0];
    setTasks((prev) => prev.map((t) => t.id === updated.id ? updated : t));
    await refreshActivities();
    return updated;
  };

  const deleteTask = async (id) => {
    await taskAPI.delete(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    await refreshActivities();
  };

  const setTaskStatus = async (id, status) => {
    const res = await taskAPI.updateStatus(id, status);
    const updated = normalize([res.data.data])[0];
    setTasks((prev) => prev.map((t) => t.id === updated.id ? updated : t));
    await refreshActivities();
    return updated;
  };

  const addLeave = async (data) => {
    const res = await leaveAPI.apply(data);
    const leave = normalize([res.data.data])[0];
    setLeaves((prev) => [leave, ...prev]);
    await refreshActivities();
    return leave;
  };

  const updateLeaveStatus = async (id, status) => {
    const res = await leaveAPI.updateStatus(id, status);
    const updated = normalize([res.data.data])[0];
    setLeaves((prev) => prev.map((l) => l.id === updated.id ? updated : l));
    await refreshActivities();
    return updated;
  };

  const markAttendance = async (date, records) => {
    const mongoRecords = records.map((r) => {
      const emp = employees.find((e) => e.id === r.employeeId || e._id === r.employeeId);
      return { employeeId: emp?._id || emp?.id || r.employeeId, status: r.status };
    });
    await attendanceAPI.bulkMark(date, mongoRecords);
    const attRes = await attendanceAPI.getAll();
    setAttendance(attRes.data.data || []);
    await refreshActivities();
  };

  // Build ratings array compatible with legacy UI
  const ratings = employees
    .filter((e) => e.rating?.rating)
    .map((e) => ({
      employeeId: e.id,
      rating: e.rating.rating,
      note: e.rating.note || '',
      updatedAt: e.rating.updatedAt || e.updatedAt,
    }));

  return (
    <DataCtx.Provider value={{
      employees, tasks, leaves, attendance, activityLogs, ratings, loading, reload: loadAll,
      addEmployee, updateEmployee, deleteEmployee, rateEmployee,
      addTask, updateTask, deleteTask, setTaskStatus,
      addLeave, updateLeaveStatus,
      markAttendance,
    }}>
      {children}
    </DataCtx.Provider>
  );
}

export function useData() { return useContext(DataCtx); }
