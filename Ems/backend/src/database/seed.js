/**
 * Seed script — populates MongoDB with sample StaffX data.
 * Run: node src/database/seed.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { MONGO_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = require('../config/env');

const User = require('../models/User');
const Employee = require('../models/Employee');
const Task = require('../models/Task');
const Leave = require('../models/Leave');
const Activity = require('../models/Activity');
const Attendance = require('../models/Attendance');

const AVATAR_COLORS = [
  '#7c3aed', '#2563eb', '#059669', '#d97706', '#dc2626',
  '#0891b2', '#65a30d', '#9333ea', '#ea580c', '#0284c7',
  '#16a34a', '#b45309', '#be185d', '#6366f1', '#f43f5e',
];

const SAMPLE_EMPLOYEES = [
  { name: 'Aman Gupta',       email: 'aman@staffx.io',     password: '123', phone: '9876543210', department: 'Engineering', role: 'Tech Lead',           status: 'Active',   salary: 140000, joiningDate: '2022-03-15', avatarColor: AVATAR_COLORS[0] },
  { name: 'Rohit Sharma',     email: 'rohit@staffx.io',    password: '123', phone: '9876543211', department: 'HR',          role: 'HR Manager',          status: 'Active',   salary: 95000,  joiningDate: '2021-07-01', avatarColor: AVATAR_COLORS[1] },
  { name: 'Rahul Singh',      email: 'rahul@staffx.io',    password: '123', phone: '9876543212', department: 'Marketing',   role: 'Marketing Manager',   status: 'Active',   salary: 105000, joiningDate: '2022-01-10', avatarColor: AVATAR_COLORS[2] },
  { name: 'Abhishek Kumar',   email: 'abhishek@staffx.io', password: '123', phone: '9876543213', department: 'Design',      role: 'Product Designer',    status: 'Active',   salary: 98000,  joiningDate: '2023-04-20', avatarColor: AVATAR_COLORS[3] },
  { name: 'Karan Malhotra',   email: 'karan@staffx.io',    password: '123', phone: '9876543214', department: 'Sales',       role: 'Sales Manager',       status: 'Active',   salary: 120000, joiningDate: '2021-11-05', avatarColor: AVATAR_COLORS[4] },
  { name: 'Gagan Thakral',    email: 'gagan@staffx.io',    password: '123', phone: '9876543215', department: 'Engineering', role: 'Software Engineer',   status: 'Active',   salary: 115000, joiningDate: '2023-06-01', avatarColor: AVATAR_COLORS[5] },
  { name: 'Vansh Arora',      email: 'vansh@staffx.io',    password: '123', phone: '9876543216', department: 'Finance',     role: 'Finance Manager',     status: 'Active',   salary: 130000, joiningDate: '2020-09-15', avatarColor: AVATAR_COLORS[6] },
  { name: 'Gautam Sachdeva',  email: 'gautam@staffx.io',   password: '123', phone: '9876543217', department: 'Operations',  role: 'Operations Manager',  status: 'Active',   salary: 110000, joiningDate: '2022-08-22', avatarColor: AVATAR_COLORS[7] },
  { name: 'Nitesh Srivastava',email: 'nitesh@staffx.io',   password: '123', phone: '9876543218', department: 'Engineering', role: 'DevOps Engineer',     status: 'Inactive', salary: 125000, joiningDate: '2021-03-10', avatarColor: AVATAR_COLORS[8] },
  { name: 'Arpit Joshi',      email: 'arpit@staffx.io',    password: '123', phone: '9876543219', department: 'Marketing',   role: 'Content Strategist',  status: 'Active',   salary: 82000,  joiningDate: '2024-01-08', avatarColor: AVATAR_COLORS[9] },
];

async function seed() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Employee.deleteMany({}),
      Task.deleteMany({}),
      Leave.deleteMany({}),
      Activity.deleteMany({}),
      Attendance.deleteMany({}),
    ]);

    // Create admin user
    console.log('👤 Creating admin user...');
    const adminUser = await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin',
    });

    // Create employees + their user accounts
    console.log('👥 Creating employees...');
    const createdEmployees = [];
    for (let i = 0; i < SAMPLE_EMPLOYEES.length; i++) {
      const { password, ...empData } = SAMPLE_EMPLOYEES[i];
      const emp = await Employee.create({ ...empData, employeeCode: `EMP-${String(i + 1).padStart(3, '0')}` });

      const user = await User.create({
        name: emp.name,
        email: emp.email,
        password,
        role: 'employee',
        employeeId: emp._id,
      });

      emp.userId = user._id;
      await emp.save();
      createdEmployees.push(emp);
    }

    // Create tasks
    console.log('📋 Creating tasks...');
    const tasks = await Task.create([
      { title: 'Prepare Q2 Report',     description: 'Compile quarterly performance data.', assignedTo: createdEmployees[0]._id, assignedBy: adminUser._id, priority: 'High',   status: 'Pending',     dueDate: '2026-06-01' },
      { title: 'Redesign Landing Page', description: 'Update hero section.',               assignedTo: createdEmployees[3]._id, assignedBy: adminUser._id, priority: 'Medium', status: 'In Progress', dueDate: '2026-05-25' },
      { title: 'Deploy Staging Server', description: 'Set up CI/CD pipeline.',             assignedTo: createdEmployees[5]._id, assignedBy: adminUser._id, priority: 'High',   status: 'Completed',   dueDate: '2026-05-15' },
      { title: 'SEO Audit',             description: 'Run full SEO audit.',                assignedTo: createdEmployees[9]._id, assignedBy: adminUser._id, priority: 'Low',    status: 'Pending',     dueDate: '2026-06-10' },
      { title: 'HR Policy Update',      description: 'Review HR documents.',              assignedTo: createdEmployees[1]._id, assignedBy: adminUser._id, priority: 'Medium', status: 'Pending',     dueDate: '2026-05-30' },
    ]);

    // Create leaves
    console.log('📅 Creating leaves...');
    await Leave.create([
      { employeeId: createdEmployees[8]._id, startDate: '2026-05-20', endDate: '2026-05-25', type: 'Sick',   reason: 'Medical procedure', status: 'Approved', appliedOn: '2026-05-10' },
      { employeeId: createdEmployees[3]._id, startDate: '2026-06-01', endDate: '2026-06-03', type: 'Casual', reason: 'Family function',   status: 'Pending',  appliedOn: '2026-05-12' },
      { employeeId: createdEmployees[5]._id, startDate: '2026-06-10', endDate: '2026-06-14', type: 'Annual', reason: 'Planned vacation',  status: 'Pending',  appliedOn: '2026-05-11' },
    ]);

    // Create sample attendance
    console.log('📊 Creating attendance...');
    const today = new Date().toISOString().split('T')[0];
    const attendanceStatuses = ['Present', 'Present', 'Present', 'WFH', 'Present', 'Present', 'Absent', 'Present', 'Absent', 'Present'];
    await Attendance.insertMany(
      createdEmployees.map((emp, i) => ({
        employeeId: emp._id,
        date: today,
        status: attendanceStatuses[i],
        markedBy: adminUser._id,
      }))
    );

    // Create activity logs
    console.log('📝 Creating activity logs...');
    await Activity.create([
      { action: `${createdEmployees[0].name}'s profile was updated`,          type: 'Update',     performedBy: adminUser._id, relatedEmployee: createdEmployees[0]._id, createdAt: new Date('2026-05-12T10:00:00Z') },
      { action: `Task "Q2 Report" assigned to ${createdEmployees[0].name}`,   type: 'Create',     performedBy: adminUser._id, relatedEmployee: createdEmployees[0]._id, createdAt: new Date('2026-05-11T09:00:00Z') },
      { action: `Leave approved for ${createdEmployees[8].name}`,             type: 'Update',     performedBy: adminUser._id, relatedEmployee: createdEmployees[8]._id, createdAt: new Date('2026-05-10T14:00:00Z') },
      { action: `${createdEmployees[9].name} added to Marketing team`,        type: 'Create',     performedBy: adminUser._id, relatedEmployee: createdEmployees[9]._id, createdAt: new Date('2026-05-09T11:00:00Z') },
      { action: `Attendance recorded for ${createdEmployees.length} employees`, type: 'Attendance', performedBy: adminUser._id, createdAt: new Date('2026-05-08T09:30:00Z') },
    ]);

    console.log('\n✅ Seed completed successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`👤 Admin:    ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
    console.log(`👥 Employees: *@staffx.io / 123`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
