const mongoose = require('mongoose');   

const mongoURL = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.2/blog'

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


const db = mongoose.connection;

  db.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
  db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });
  
  db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
  });
