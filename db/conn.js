const mongoose = require('mongoose')


mongoose.connect("mongodb+srv://jenilkundaliya:SF1PbmQktb11VyZC@cluster0.isbp4.mongodb.net/test",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('db connected')
}).catch((e)=>{
    console.log("error")
    console.log(e)
})