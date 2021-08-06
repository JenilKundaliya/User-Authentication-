const express = require('express')
const bcrypt = require("bcryptjs")
const app = express();
const path = require("path");
const hbs = require('hbs')
const PORT = process.env.PORT || 8000;
require('../db/conn')
const UserData = require('../models/registration')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const staticPath = path.join(__dirname,"../public")
const templatesPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

// app.use(express.static(staticPath))
app.set("view engine","hbs");
app.set("views",templatesPath);
hbs.registerPartials(partialsPath)
app.get("/",(req,res)=>{
    console.log('hi')
res.render("index")
})
app.get("/register",(req,res)=>{
   
   console.log("hello")
    res.render("registration")
})
app.post("/register",async(req,res)=>{
    try{

    
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var cpassword = req.body.cpassword;
    var phone = req.body.phone;
    if(password === cpassword){

    const User = new UserData({
        name:name,
        email:email,
        password:password,
        cpassword:cpassword,
        phone:phone
    })
    
    await User.save()
    res.render("index")
}
else{
    res.send("Passwords Don't match correctly")
}
}

catch(e){
  console.log(e)  
}
    
})
app.post("/login",async(req,res)=>{
    try{
var email = req.body.email;
var password = req.body.password;
console.log(`pass ${password}`)
const userEmail = await UserData.findOne({email});
console.log(userEmail)

const isMatch = await bcrypt.compare(password,userEmail.password)
console.log(isMatch)
if(isMatch){
    res.send("Succesfully logged in")
}
else{
    res.send("invalid login details")
}
    }
    catch(e){

    }
})
app.get("/login",(req,res)=>{
    res.render("login")
})


//Now we will simply call securePassword function and will pass argument to it i.e. a random password
//just to check whether it works or not

//Here below is the hash of our password
//which is almost impossible for hacker to hack
// $2b$10$gnQaeg3HrdplOnEujwaj8Ole0fVE8mh7sF8A52zZ9bfNvcJH3RjP2


app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})