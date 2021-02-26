const dotenv = require('dotenv');
const connectDB = require('./db');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');

  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: './config.env' });

connectDB();

const app = require('./app');

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);

  console.log(`UNHANDLER REJECTION! Shutting down...`);

  server.close(() => {
    process.exit(1);
  });
});
