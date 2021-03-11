const allowCrossDomain = require('./middlewares/cors.middlewares');
const mongoose = require("mongoose");
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const usersRouter = require('./routes/usersRoutes.js');

const app = express();

app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(true));
app.use('/users', usersRouter);

// app.use(cors());
app.options('*', cors());
app.use(cors({origin: 'http://localhost:8081'}));
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });


mongoose.connect("mongodb+srv://Beresneva:45698210@cluster0.ksoad.mongodb.net/Database?retryWrites=true&w=majority&ssl=true", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log(`Server is running at http://localhost:${3000}`);
    });
});
