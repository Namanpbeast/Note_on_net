const connectToDB=require('./config/dbConnect');
const express = require('express')
const cors = require('cors');

connectToDB();
const app = express()
const port=5000;


app.use(cors());
app.use(express.json())

// respond with "hello world" when a GET request is made to the homepage
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes', require('./routes/note'))

app.listen(port,()=>{
    console.log(`The app has been listened at http://localhost:${port}`)
})