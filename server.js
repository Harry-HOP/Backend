const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser');
require('dotenv').config();
const passport =  require('./auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000

// Middleware Function
const logRequet = (req, res, next) =>{
  console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
  next();
} 
app.use(logRequet);


app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false})

app.get('/', localAuthMiddleware,function (req, res) {
  res.send('Hello World')
}) 



//   Import the router file
const personRouter = require('./Router/Person');
const User = require('./models/User');

// use the routers
app.use('/user', personRouter);





app.listen(PORT,()=>{console.log("Site is live")})

