const mongoose = require('mongoose')
const connectUri ="mongodb://localhost:27017"

const connectToDB=async()=>{
     mongoose.connect(connectUri, { useNewUrlParser: true, useUnifiedTopology: true });
}
module.exports=connectToDB;