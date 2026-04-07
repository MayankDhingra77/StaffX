const employees = [
  {
    id: 1,
    firstName: "Amit",
    email: "employee1@example.com",
    password: "123",
    taskCount: { active: 2, newTask: 2, completed: 1, failed: 0 },
    tasks: [
      { active: true, newTask: true, completed: false, failed: false, taskTitle: "Prepare report", taskDescription: "Create monthly sales report", taskDate: "2026-03-20", category: "Reports" },
      { active: true, newTask: true, completed: false, failed: false, taskTitle: "Email client", taskDescription: "Send updated proposal", taskDate: "2026-03-22", category: "Communication" },
      { active: false, newTask: false, completed: true, failed: false, taskTitle: "Client meeting", taskDescription: "Discuss requirements", taskDate: "2026-03-18", category: "Meeting" }
    ]
  },
  {
    id: 2,
    firstName: "Rahul",
    email: "employee2@example.com",
    password: "123",
    taskCount: { active: 1, newTask: 1, completed: 2, failed: 1 },
    tasks: [
      { active: true, newTask: true, completed: false, failed: false, taskTitle: "Design UI", taskDescription: "Dashboard UI", taskDate: "2026-03-21", category: "Design" },
      { active: false, newTask: false, completed: true, failed: false, taskTitle: "Logo update", taskDescription: "Update logo", taskDate: "2026-03-17", category: "Design" },
      { active: false, newTask: false, completed: true, failed: false, taskTitle: "Banner design", taskDescription: "Create homepage banner", taskDate: "2026-03-19", category: "Design" },
      { active: false, newTask: false, completed: false, failed: true, taskTitle: "Animation", taskDescription: "Landing page animation", taskDate: "2026-03-19", category: "Frontend" }
    ]
  },
  {
    id: 3,
    firstName: "Priya",
    email: "employee3@example.com",
    password: "123",
    taskCount: { active: 1, newTask: 1, completed: 1, failed: 2 },
    tasks: [
      { active: true, newTask: true, completed: false, failed: false, taskTitle: "Database setup", taskDescription: "MongoDB schema", taskDate: "2026-03-21", category: "Backend" },
      { active: false, newTask: false, completed: true, failed: false, taskTitle: "API integration", taskDescription: "Payment API", taskDate: "2026-03-18", category: "Backend" },
      { active: false, newTask: false, completed: false, failed: true, taskTitle: "Optimize queries", taskDescription: "Improve performance", taskDate: "2026-03-19", category: "Database" },
      { active: false, newTask: false, completed: false, failed: true, taskTitle: "Fix indexing", taskDescription: "Index optimization", taskDate: "2026-03-20", category: "Database" }
    ]
  },
  {
    id: 4,
    firstName: "Sneha",
    email: "employee4@example.com",
    password: "123",
    taskCount: { active: 2, newTask: 1, completed: 1, failed: 1 },
    tasks: [
      { active: true, newTask: true, completed: false, failed: false, taskTitle: "Write tests", taskDescription: "Unit testing", taskDate: "2026-03-21", category: "Testing" },
      { active: true, newTask: false, completed: false, failed: false, taskTitle: "Regression testing", taskDescription: "Run regression suite", taskDate: "2026-03-22", category: "QA" },
      { active: false, newTask: false, completed: true, failed: false, taskTitle: "Bug verification", taskDescription: "Verify bugs", taskDate: "2026-03-18", category: "QA" },
      { active: false, newTask: false, completed: false, failed: true, taskTitle: "Automation", taskDescription: "Automation scripts", taskDate: "2026-03-19", category: "QA" }
    ]
  },
  {
    id: 5,
    firstName: "Arjun",
    email: "employee5@example.com",
    password: "123",
    taskCount: { active: 1, newTask: 1, completed: 2, failed: 0 },
    tasks: [
      { active: true, newTask: true, completed: false, failed: false, taskTitle: "Deploy app", taskDescription: "Production deploy", taskDate: "2026-03-21", category: "DevOps" },
      { active: false, newTask: false, completed: true, failed: false, taskTitle: "CI/CD setup", taskDescription: "Pipeline setup", taskDate: "2026-03-17", category: "DevOps" },
      { active: false, newTask: false, completed: true, failed: false, taskTitle: "Server config", taskDescription: "NGINX setup", taskDate: "2026-03-18", category: "DevOps" }
    ]
  },
  {
    id: 6,
    firstName: "Karan",
    email: "employee6@example.com",
    password: "123",
    taskCount: { active: 2, newTask: 2, completed: 1, failed: 0 },
    tasks: [
      { active: true, newTask: true, completed: false, failed: false, taskTitle: "Fix bugs", taskDescription: "Resolve issues", taskDate: "2026-03-21", category: "Frontend" },
      { active: true, newTask: true, completed: false, failed: false, taskTitle: "Update UI", taskDescription: "Improve styling", taskDate: "2026-03-22", category: "Design" },
      { active: false, newTask: false, completed: true, failed: false, taskTitle: "Code review", taskDescription: "Review PRs", taskDate: "2026-03-19", category: "Development" }
    ]
  },
  {
    id: 7,
    firstName: "Neha",
    email: "employee7@example.com",
    password: "123",
    taskCount: { active: 1, newTask: 1, completed: 2, failed: 1 },
    tasks: [
      { active: true, newTask: true, completed: false, failed: false, taskTitle: "Content writing", taskDescription: "Write blog", taskDate: "2026-03-21", category: "Content" },
      { active: false, newTask: false, completed: true, failed: false, taskTitle: "SEO update", taskDescription: "Optimize keywords", taskDate: "2026-03-18", category: "Marketing" },
      { active: false, newTask: false, completed: true, failed: false, taskTitle: "Newsletter", taskDescription: "Email campaign", taskDate: "2026-03-17", category: "Marketing" },
      { active: false, newTask: false, completed: false, failed: true, taskTitle: "Ad campaign", taskDescription: "Run ads", taskDate: "2026-03-19", category: "Marketing" }
    ]
  },
  {
    id: 8,
    firstName: "Vikas",
    email: "employee8@example.com",
    password: "123",
    taskCount: { active: 2, newTask: 1, completed: 1, failed: 1 },
    tasks: [
      { active: true, newTask: true, completed: false, failed: false, taskTitle: "API testing", taskDescription: "Test APIs", taskDate: "2026-03-21", category: "Testing" },
      { active: true, newTask: false, completed: false, failed: false, taskTitle: "Load testing", taskDescription: "Performance test", taskDate: "2026-03-22", category: "Testing" },
      { active: false, newTask: false, completed: true, failed: false, taskTitle: "Bug report", taskDescription: "Report bugs", taskDate: "2026-03-18", category: "QA" },
      { active: false, newTask: false, completed: false, failed: true, taskTitle: "Automation failure", taskDescription: "Fix scripts", taskDate: "2026-03-19", category: "QA" }
    ]
  },
  {
    id: 9,
    firstName: "Anjali",
    email: "employee9@example.com",
    password: "123",
    taskCount: { active: 1, newTask: 1, completed: 2, failed: 0 },
    tasks: [
      { active: true, newTask: true, completed: false, failed: false, taskTitle: "HR onboarding", taskDescription: "Onboard hires", taskDate: "2026-03-21", category: "HR" },
      { active: false, newTask: false, completed: true, failed: false, taskTitle: "Policy update", taskDescription: "Update rules", taskDate: "2026-03-18", category: "HR" },
      { active: false, newTask: false, completed: true, failed: false, taskTitle: "Employee review", taskDescription: "Review performance", taskDate: "2026-03-19", category: "HR" }
    ]
  },
  {
    id: 10,
    firstName: "Rohit",
    email: "employee10@example.com",
    password: "123",
    taskCount: { active: 2, newTask: 2, completed: 0, failed: 1 },
    tasks: [
      { active: true, newTask: true, completed: false, failed: false, taskTitle: "Security audit", taskDescription: "Check security", taskDate: "2026-03-21", category: "Security" },
      { active: true, newTask: true, completed: false, failed: false, taskTitle: "Encryption setup", taskDescription: "SSL setup", taskDate: "2026-03-22", category: "Security" },
      { active: false, newTask: false, completed: false, failed: true, taskTitle: "Pen testing", taskDescription: "Pen test", taskDate: "2026-03-19", category: "Security" }
    ]
  }
];


const admin = [
  {
    "id": 1,
    "email": "admin@example.com",
    "password": "123"
  }
];

export const setLocalStorage = () =>{
    localStorage.setItem('employees' , JSON.stringify(employees))
    localStorage.setItem('admin' , JSON.stringify(admin) )
}
export const getLocalStorage = () =>{
    const employeeData = localStorage.getItem('employees')
    const adminData = localStorage.getItem('admin')
    return {
        employees : employeeData ? JSON.parse(employeeData) : null, 
        admin: adminData ? JSON.parse(adminData) : null
    } ;
}
