const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');
const Activity = require('../models/Activity');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');

const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Log activity
    await Activity.create({
      action: `${user.name} logged in`,
      type: 'Login',
      performedBy: user._id,
    });

    // Get linked employee data if role is employee
    let employeeData = null;
    if (user.employeeId) {
      employeeData = await Employee.findById(user.employeeId).lean();
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          employeeId: user.employeeId,
          employeeCode: employeeData?.employeeCode || null,
          avatarColor: employeeData?.avatarColor || null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/register  (admin only in production; open for seeding)
const register = async (req, res, next) => {
  try {
    const { name, email, password, role, employeeId } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already registered.' });
    }

    const user = await User.create({ name, email, password, role: role || 'employee', employeeId: employeeId || null });

    // Link user to employee record
    if (employeeId) {
      await Employee.findByIdAndUpdate(employeeId, { userId: user._id });
    }

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { token, user },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).lean();
    let employeeData = null;
    if (user.employeeId) {
      employeeData = await Employee.findById(user.employeeId).lean();
    }

    res.json({
      success: true,
      data: {
        ...user,
        employeeCode: employeeData?.employeeCode || null,
        avatarColor: employeeData?.avatarColor || null,
        department: employeeData?.department || null,
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/logout
const logout = async (req, res) => {
  // JWT is stateless — client just discards token.
  // Optionally log the event.
  Activity.create({
    action: `${req.user.name} logged out`,
    type: 'Login',
    performedBy: req.user._id,
  }).catch(() => {});

  res.json({ success: true, message: 'Logged out successfully.' });
};

// PUT /api/auth/change-password
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: 'Password changed successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, register, getMe, logout, changePassword };
