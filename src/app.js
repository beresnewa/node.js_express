const mongoose = require("mongoose");
const express = require('express');
const cors = require('cors');

// const bodyParser = require('body-parser');
const usersRouter = require('./routes/usersRoutes.js');


const app = express();
app.use(cors());
app.options('*', cors());
app.use(cors({origin: 'http://localhost:8081'}));
app.use(cors({
    origin: true,
    credentials: true
}));

const options = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' === req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
}

app.use(options)
app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded(true));

app.use('/users', usersRouter);

mongoose.connect("mongodb+srv://Beresneva:45698210@cluster0.ksoad.mongodb.net/Database?retryWrites=true&w=majority&ssl=true", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log(`Server is running at http://localhost:${3000}`);
    });
});
