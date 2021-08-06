const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    name:{
        require:true,
        type:String
    },
    email:{
        require:true,
        unique:[true,"Email already exists"],
        type:String,
        validate(value){
if(!validator.isEmail(value)){
    console.error('INvalid email')
}
        }
    },
    password:{
        require:true,
        type:String
    },
    confirmpassword:{
        require:true,
        type:String
    },
    phone:{
        require:true,
        unique:[true,"phone number already exists"],
        type:Number
    }
})

userSchema.pre("save",async function(next){
   const user = this;
   console.log(this.password)
const passencrypt = await bcrypt.hash(user.password,12);
this.password = passencrypt;
    next();
})
const User = new mongoose.model('User',userSchema);
module.exports = User;