const app = require('./src/app');
const connectDb = require('./src/config/db');
const { seedDefaultUsers } = require('./src/services/user.service');

const PORT = process.env.PORT || 8070;

const bootstrap = async () => {
  await connectDb();

  if (process.env.MONGODB_URL || process.env.MONGO_URL) {
    try {
      await seedDefaultUsers();
      console.log('Default auth users are ready.');
    } catch (error) {
      console.error('Failed to seed default users:', error.message);
    }
  }

  app.listen(PORT, () => {
    console.log(`Server is up and running on port : ${PORT}`);
  });
};

bootstrap().catch((error) => {
  console.error('Server bootstrap error:', error.message);
  process.exit(1);
});
