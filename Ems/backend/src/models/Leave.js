const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: [true, 'Employee ID is required'],
    },
    type: {
      type: String,
      enum: ['Casual', 'Sick', 'Annual', 'Unpaid'],
      required: [true, 'Leave type is required'],
    },
    startDate: {
      type: String,
      required: [true, 'Start date is required'],
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'],
    },
    endDate: {
      type: String,
      required: [true, 'End date is required'],
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'],
    },
    reason: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'],
      default: 'Pending',
    },
    appliedOn: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
    reviewNote: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

leaveSchema.index({ employeeId: 1 });
leaveSchema.index({ status: 1 });
leaveSchema.index({ startDate: 1, endDate: 1 });

module.exports = mongoose.model('Leave', leaveSchema);
