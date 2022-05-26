const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(express.json());

// mongo db connection
connectDB();

// app.use('/api/v1', (req, res) => {
//   res.status(200).json('Hello World!!');
// });
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

// global error handler
app.use((error, req, res, next) => {
  console.log('-ERROR-', error);
  const statusCode = error.statusCode || 500;
  const message = error.message || 'System error occured!';
  const stack = error.stack || null;
  res.status(statusCode).json({
    message: message,
    stack: stack,
    statusCode: statusCode,
  });
});

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} on port:${port}`));
