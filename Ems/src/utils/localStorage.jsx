const employees = [
  {
    id: 1,
    firstName: "Amit",
    email: "employee1@example.com",
    password: "123",
    taskCount: {
      active: 1,
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
        taskTitle: "Prepare report",
        taskDescription: "Create monthly sales report",
        taskDate: "2026-03-20",
        category: "Reports"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Client meeting",
        taskDescription: "Discuss requirements with client",
        taskDate: "2026-03-18",
        category: "Meeting"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Fix bug",
        taskDescription: "Resolve login issue",
        taskDate: "2026-03-19",
        category: "Development"
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
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Design UI",
        taskDescription: "Create dashboard UI",
        taskDate: "2026-03-21",
        category: "Design"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Logo update",
        taskDescription: "Update company logo",
        taskDate: "2026-03-17",
        category: "Design"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Animation",
        taskDescription: "Add animations to landing page",
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
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Database setup",
        taskDescription: "Setup MongoDB schema",
        taskDate: "2026-03-21",
        category: "Backend"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "API integration",
        taskDescription: "Integrate payment API",
        taskDate: "2026-03-18",
        category: "Backend"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Optimize queries",
        taskDescription: "Improve DB performance",
        taskDate: "2026-03-19",
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
      active: 1,
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
        taskDescription: "Unit testing for APIs",
        taskDate: "2026-03-21",
        category: "Testing"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Bug verification",
        taskDescription: "Verify resolved bugs",
        taskDate: "2026-03-18",
        category: "QA"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Automation",
        taskDescription: "Setup automation scripts",
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
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Deploy app",
        taskDescription: "Deploy on production server",
        taskDate: "2026-03-21",
        category: "DevOps"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "CI/CD setup",
        taskDescription: "Setup pipeline",
        taskDate: "2026-03-17",
        category: "DevOps"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Monitor logs",
        taskDescription: "Fix server errors",
        taskDate: "2026-03-19",
        category: "Monitoring"
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
