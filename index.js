const express = require('express'); 
const dotenv = require('dotenv'); 
const morgan = require('morgan'); 
const connectDb = require('./src/config/db'); 
const adminRoutes = require('./src/routers/adminroutes'); 
const userRoutes = require('./src/routers/useroutes'); 
const authRoutes = require('./src/routers/authroutes'); 
const passport = require('passport'); 
require('./src/middleware/googleauth');
require('./src/middleware/facebookauth');

const app = express(); 
dotenv.config(); 
const PORT = process.env.PORT 

app.use(express.json()); 
app.use(morgan('dev')); 
app.use(express.urlencoded()); 
app.use(passport.initialize());
app.use('/api/v1/admin', adminRoutes); 
app.use('/api/v1/user', userRoutes); 
app.use('/auth', authRoutes); 
app.use(express.static('views'));



app.listen(PORT, () =>{
    connectDb(); 
    console.log(`Server is listening on ${PORT}`)
});




