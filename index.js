const express = require('express'); 
const dotenv = require('dotenv'); 
const morgan = require('morgan'); 
const connectDb = require('./db'); 


const app = express(); 
dotenv.config(); 
const PORT = process.env.PORT 

app.use(express.json()); 
app.use(morgan('dev')); 
app.use(express.urlencoded()); 


app.listen(PORT, () =>{
    connectDb(); 
    console.log(`Server is listening on ${PORT}`)
}); 
