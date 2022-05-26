const mongoose = require('mongoose');

const connectDB = async (req, res, next) => {
  mongoose
    .connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((con) => {
      console.log('Mongodb connection successed: ' + con.connection.host);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = connectDB;
