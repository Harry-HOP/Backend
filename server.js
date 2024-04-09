const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser');
require('dotenv').config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000

// app.get('/', function (req, res) {
//   res.send('Hello World')
// }) 



//   Import the router file
const personRouter = require('./Router/Person');

// use the routers
app.use('/', personRouter);





app.listen(PORT,()=>{console.log("Site is live")})

