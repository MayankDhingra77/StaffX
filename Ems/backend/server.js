const app = require('./src/app');
const connectDB = require('./src/config/db');
const { PORT } = require('./src/config/env');

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 StaffX API running on http://localhost:${PORT}`);
    console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

start();
