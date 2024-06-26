const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Define the User schema
const userSchema = new mongoose.Schema({
 username: {
 type: String,
 required: true,
 unique: true,
 },
 email: {
 type: String,
 required: true,
 unique: true,
 },
 password: {
 type: String,
 required: true,
 },
 
});

userSchema.pre('save', async function(next){
    const person = this;

    //Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();
    try{
        // hash password generate
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // override the plain password with the hashed one
        person.password = hashedPassword;

        next();
    }
    catch(err){
        return next(err);
    }
})

userSchema.methods.comparePassword = async function(candiatePassword){
        try{
            // use bcrypt to compare the provided password with hashed password
            const isMatch = await bcrypt.compare(candiatePassword, this.password);
            return isMatch;

        }
        catch(err){
            throw err;
        }
    }



// Create the User model from the schema
const User = mongoose.model('User', userSchema);
module.exports = User;