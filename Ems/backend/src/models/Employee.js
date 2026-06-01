const mongoose = require('mongoose');

const AVATAR_COLORS = [
  '#7c3aed', '#2563eb', '#059669', '#d97706', '#dc2626',
  '#0891b2', '#65a30d', '#9333ea', '#ea580c', '#0284c7',
  '#16a34a', '#b45309', '#be185d', '#6366f1', '#f43f5e',
];

const ratingSchema = new mongoose.Schema(
  {
    rating: { type: Number, min: 1, max: 5, required: true },
    note: { type: String, trim: true, default: '' },
    ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const employeeSchema = new mongoose.Schema(
  {
    employeeCode: {
      type: String,
      unique: true,
      // Auto-generated: EMP-001, EMP-002, etc.
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Design'],
    },
    role: {
      type: String,
      required: [true, 'Role/Designation is required'],
      trim: true,
    },
    salary: {
      type: Number,
      required: [true, 'Salary is required'],
      min: [0, 'Salary cannot be negative'],
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    joiningDate: {
      type: String,
      required: [true, 'Joining date is required'],
    },
    avatarColor: {
      type: String,
      default: () => AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
    },
    rating: {
      type: ratingSchema,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
employeeSchema.index({ department: 1 });
employeeSchema.index({ status: 1 });
employeeSchema.index({ name: 'text', email: 'text' });

// Auto-generate employee code
employeeSchema.pre('save', async function (next) {
  if (this.isNew && !this.employeeCode) {
    const count = await mongoose.model('Employee').countDocuments();
    this.employeeCode = `EMP-${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Employee', employeeSchema);
