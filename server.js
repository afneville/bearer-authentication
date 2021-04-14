const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

// Mongodb connection options
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true,
  keepAlive: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

// Connect to the database
mongoose.connect(db, options).then(() => {
    console.log("mongo connected");
}).catch((err) => {
    console.log(err);
});

// Create the express app
const app = express();

// Use middleware and routes.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/user', require('./routes/api/user'));

// Start the server on a specified port or 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
