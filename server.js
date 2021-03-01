const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true,
  keepAlive: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}
mongoose.connect(db, options).then(() => {
    console.log("mongo connected");
}).catch((err) => {
    console.log(err);
});

//function test_middleware(req, res, next) {
//
    //console.log("hello from middleware");
    //req.body = {msg: "hello"};
    //next();
//}



const app = express();

//app.get('/test', test_middleware, (req, res) => {
    //console.log("hello from main route");
    //console.log(req.body.msg);
    //res.sendStatus(200);
//});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));5000
app.use('/api/user', require('./routes/api/user'));
app.use('/api/conversation', require('./routes/api/conversation'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
