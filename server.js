const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello World')
})



//   Import the router file
const personRouter = require('./Router/Person');

// use the routers
app.use('/user', personRouter);





app.listen(3000,()=>{console.log("Site is live")})

// uploaded to git