const express = require('express');

const bodyParser = require('body-parser');
const usersRouter = require('./routes/usersRoutes.js');
// const multer = require('multer');

const app = express();

app.use('/public', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(true));
// app.use(multer().array());

app.use('/users', usersRouter);

app.listen(3000, () => {
    console.log(`Server is running at http://localhost${3000}`)
})