const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {jwtAuthMiddleware, generateToken} = require('../jwt');

router.post('/login', async(req, res) =>{
    try{
        // Extract username and password from request body
        const {username, password} = req.body;
        
        // Find the user by username
        const user = await User.findOne({username: username});

        // if user does not exist or password does not match , return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate token 
        const payload = {
            id: user.id,
            username: user.username
        }

        const token = generateToken(payload);

        //return token as response
        res.json({token});


    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Errorrrr'});
    }
})
router.post('/Signup', async(req, res) => {
    try{
        // Get the user data from the request body
    const data = req.body;
  
    // Save the user to the database
    // ...
    const newUser = new User(data)

    const resposnse = await newUser.save();
    console.log("Data Saved");
    const paylod = {
        id: resposnse.id,
        username: resposnse.username
    }
    const token = generateToken(paylod);
    res.status(200).json({resposnse: resposnse, token: token});
  
    // Send a response to the client
    // res.send('User created successfully!');

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
  });


  router.get('/',async(req, res) => {

    try{
        const data = await User.find();
        res.status(200).json(data);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});

    }

  })


  router.get('/:nam', async(req, res) => {
    try{

        const nam = req.params.nam;
        if(nam == 'hariom' || nam == 'shreeom' ){
            const response = await User.find({username: nam})
            console.log('response fetched');
            res.status(200).json(response);
        }

        else{
            res.status(404).json({error: 'Invalid name type'});

        }


    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
  })



  router.put('/:id', async(req, res) => {
    try{
         const personId = req.params.id;
         const persondata = req.body;

         const response = await User.findByIdAndUpdate(personId, persondata, {
            new: true,
            runValidators: true,
         })

         console.log("Data updated");
         res.status(200).json(response);

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
  })

  router.delete('/:id', async(req, res) => {
    try{
        const personid = req.params.id;

        const response = await User.findByIdAndDelete(personid);

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log("Data Deleted");
        res.status(200).json(response);


    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
    
  })


  module.exports = router;