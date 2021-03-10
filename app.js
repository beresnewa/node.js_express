const mongoose = require("mongoose");
const express = require('express');

const bodyParser = require('body-parser');
const usersRouter = require('./routes/usersRoutes.js');

const app = express();

app.use('/public', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(true));

app.use('/users', usersRouter);

mongoose.connect("mongodb+srv://Beresneva:45698210@cluster0.ksoad.mongodb.net/Database?retryWrites=true&w=majority&ssl=true", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log(`Server is running at http://localhost:${3000}`);
    });
});

// app.get('/', function(req, res) {
//     res.send('Hello World')
//   })