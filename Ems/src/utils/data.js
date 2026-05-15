const AVATAR_COLORS = [
  "#7c3aed","#2563eb","#059669","#d97706","#dc2626",
  "#0891b2","#65a30d","#9333ea","#ea580c","#0284c7",
  "#16a34a","#b45309","#be185d","#6366f1","#f43f5e",
];

const SAMPLE_EMPLOYEES = [
  { id:"EMP-001", name:"Aman Gupta",         email:"aman@staffx.io",     password:"123", phone:"9876543210", department:"Engineering", role:"Tech Lead",           status:"Active",   salary:140000, joiningDate:"2022-03-15", avatarColor:AVATAR_COLORS[0] },
  { id:"EMP-002", name:"Rohit Sharma",        email:"rohit@staffx.io",    password:"123", phone:"9876543211", department:"HR",          role:"HR Manager",          status:"Active",   salary:95000,  joiningDate:"2021-07-01", avatarColor:AVATAR_COLORS[1] },
  { id:"EMP-003", name:"Rahul Singh",         email:"rahul@staffx.io",    password:"123", phone:"9876543212", department:"Marketing",   role:"Marketing Manager",   status:"Active",   salary:105000, joiningDate:"2022-01-10", avatarColor:AVATAR_COLORS[2] },
  { id:"EMP-004", name:"Abhishek Kumar",      email:"abhishek@staffx.io", password:"123", phone:"9876543213", department:"Design",      role:"Product Designer",    status:"Active",   salary:98000,  joiningDate:"2023-04-20", avatarColor:AVATAR_COLORS[3] },
  { id:"EMP-005", name:"Karan Malhotra",      email:"karan@staffx.io",    password:"123", phone:"9876543214", department:"Sales",       role:"Sales Manager",       status:"Active",   salary:120000, joiningDate:"2021-11-05", avatarColor:AVATAR_COLORS[4] },
  { id:"EMP-006", name:"Gagan Thakral",       email:"gagan@staffx.io",    password:"123", phone:"9876543215", department:"Engineering", role:"Software Engineer",   status:"Active",   salary:115000, joiningDate:"2023-06-01", avatarColor:AVATAR_COLORS[5] },
  { id:"EMP-007", name:"Vansh Arora",         email:"vansh@staffx.io",    password:"123", phone:"9876543216", department:"Finance",     role:"Finance Manager",     status:"Active",   salary:130000, joiningDate:"2020-09-15", avatarColor:AVATAR_COLORS[6] },
  { id:"EMP-008", name:"Gautam Sachdeva",     email:"gautam@staffx.io",   password:"123", phone:"9876543217", department:"Operations",  role:"Operations Manager",  status:"Active",   salary:110000, joiningDate:"2022-08-22", avatarColor:AVATAR_COLORS[7] },
  { id:"EMP-009", name:"Nitesh Srivastava",   email:"nitesh@staffx.io",   password:"123", phone:"9876543218", department:"Engineering", role:"DevOps Engineer",     status:"Inactive", salary:125000, joiningDate:"2021-03-10", avatarColor:AVATAR_COLORS[8] },
  { id:"EMP-010", name:"Arpit Joshi",         email:"arpit@staffx.io",    password:"123", phone:"9876543219", department:"Marketing",   role:"Content Strategist",  status:"Active",   salary:82000,  joiningDate:"2024-01-08", avatarColor:AVATAR_COLORS[9] },
];

const ADMIN_CREDENTIALS = { email: "admin@staffx.io", password: "admin123" };

export function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
}

export function initData() {
  const raw = localStorage.getItem("staffx_data");
  if (raw) {
    try { return JSON.parse(raw); } catch {}
  }
  return {
    employees: SAMPLE_EMPLOYEES,
    tasks: [
      { id:"TASK-001", title:"Prepare Q2 Report",      description:"Compile quarterly performance data.", assignedTo:"EMP-001", priority:"High",   status:"Pending",     dueDate:"2026-06-01", createdAt:"2026-05-10T09:00:00Z" },
      { id:"TASK-002", title:"Redesign Landing Page",  description:"Update hero section.",  assignedTo:"EMP-004", priority:"Medium", status:"In Progress", dueDate:"2026-05-25", createdAt:"2026-05-08T11:00:00Z" },
      { id:"TASK-003", title:"Deploy Staging Server",  description:"Set up CI/CD pipeline.",           assignedTo:"EMP-006", priority:"High",   status:"Completed",   dueDate:"2026-05-15", createdAt:"2026-05-05T08:00:00Z" },
      { id:"TASK-004", title:"SEO Audit",              description:"Run full SEO audit.",          assignedTo:"EMP-010", priority:"Low",    status:"Pending",     dueDate:"2026-06-10", createdAt:"2026-05-11T14:00:00Z" },
      { id:"TASK-005", title:"HR Policy Update",       description:"Review HR documents.",              assignedTo:"EMP-002", priority:"Medium", status:"Pending",     dueDate:"2026-05-30", createdAt:"2026-05-09T10:00:00Z" },
    ],
    leaves: [
      { id:"LV-001", employeeId:"EMP-009", startDate:"2026-05-20", endDate:"2026-05-25", type:"Sick",   reason:"Medical procedure", status:"Approved", appliedOn:"2026-05-10" },
      { id:"LV-002", employeeId:"EMP-004", startDate:"2026-06-01", endDate:"2026-06-03", type:"Casual", reason:"Family function",                status:"Pending",  appliedOn:"2026-05-12" },
      { id:"LV-003", employeeId:"EMP-006", startDate:"2026-06-10", endDate:"2026-06-14", type:"Annual", reason:"Planned vacation",               status:"Pending",  appliedOn:"2026-05-11" },
    ],
    activityLogs: [
      { id:"LOG-001", action:"Aman Gupta's profile was updated",    timestamp:"2026-05-12T10:00:00Z" },
      { id:"LOG-002", action:"Q2 Report task assigned to Aman Gupta",    timestamp:"2026-05-11T09:00:00Z" },
      { id:"LOG-003", action:"Leave request approved for Nitesh Srivastava",      timestamp:"2026-05-10T14:00:00Z" },
      { id:"LOG-004", action:"Arpit Joshi added to Marketing team",     timestamp:"2026-05-09T11:00:00Z" },
      { id:"LOG-005", action:"Attendance recorded for 10 employees",           timestamp:"2026-05-08T09:30:00Z" },
    ],
  };
}

export { AVATAR_COLORS, ADMIN_CREDENTIALS };

export function formatCurrency(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${(n / 1000).toFixed(0)}K`;
}
