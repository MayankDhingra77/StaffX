const employees = [
  {
    id: 1,
    firstName: "Amit",
    email: "employee1@example.com",
    password: "123",
    taskCount: {
      active: 2,
      newTask: 2,
      completed: 1,
      failed: 0
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Prepare report",
        taskDescription: "Create monthly sales report",
        taskDate: "2026-03-20",
        category: "Reports"
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Email client",
        taskDescription: "Send updated proposal",
        taskDate: "2026-03-22",
        category: "Communication"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Client meeting",
        taskDescription: "Discuss requirements",
        taskDate: "2026-03-18",
        category: "Meeting"
      }
    ]
  },
  {
    id: 2,
    firstName: "Rahul",
    email: "employee2@example.com",
    password: "123",
    taskCount: {
      active: 1,
      newTask: 1,
      completed: 2,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Design UI",
        taskDescription: "Dashboard UI",
        taskDate: "2026-03-21",
        category: "Design"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Logo update",
        taskDescription: "Update logo",
        taskDate: "2026-03-17",
        category: "Design"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Banner design",
        taskDescription: "Create homepage banner",
        taskDate: "2026-03-19",
        category: "Design"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Animation",
        taskDescription: "Landing page animation",
        taskDate: "2026-03-19",
        category: "Frontend"
      }
    ]
  },
  {
    id: 3,
    firstName: "Priya",
    email: "employee3@example.com",
    password: "123",
    taskCount: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 2
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Database setup",
        taskDescription: "MongoDB schema",
        taskDate: "2026-03-21",
        category: "Backend"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "API integration",
        taskDescription: "Payment API",
        taskDate: "2026-03-18",
        category: "Backend"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Optimize queries",
        taskDescription: "Improve performance",
        taskDate: "2026-03-19",
        category: "Database"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Fix indexing",
        taskDescription: "Index optimization",
        taskDate: "2026-03-20",
        category: "Database"
      }
    ]
  },
  {
    id: 4,
    firstName: "Sneha",
    email: "employee4@example.com",
    password: "123",
    taskCount: {
      active: 2,
      newTask: 1,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Write tests",
        taskDescription: "Unit testing",
        taskDate: "2026-03-21",
        category: "Testing"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Regression testing",
        taskDescription: "Run regression suite",
        taskDate: "2026-03-22",
        category: "QA"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Bug verification",
        taskDescription: "Verify bugs",
        taskDate: "2026-03-18",
        category: "QA"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Automation",
        taskDescription: "Automation scripts",
        taskDate: "2026-03-19",
        category: "QA"
      }
    ]
  },
  {
    id: 5,
    firstName: "Arjun",
    email: "employee5@example.com",
    password: "123",
    taskCount: {
      active: 1,
      newTask: 1,
      completed: 2,
      failed: 0
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Deploy app",
        taskDescription: "Production deploy",
        taskDate: "2026-03-21",
        category: "DevOps"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "CI/CD setup",
        taskDescription: "Pipeline setup",
        taskDate: "2026-03-17",
        category: "DevOps"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Server config",
        taskDescription: "NGINX setup",
        taskDate: "2026-03-18",
        category: "DevOps"
      }
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
