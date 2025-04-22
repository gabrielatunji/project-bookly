const express = require('express'); 
const dotenv = require('dotenv'); 
const morgan = require('morgan'); 
const connectDb = require('./db'); 
const adminRoutes = require('./routers/adminroutes'); 
const userRoutes = require('./routers/useroutes'); 
const passport = require('passport'); 
const authRoutes = require('./routers/authroutes'); 
require('./passport.setup'); 
const session = require('express-session');

const app = express(); 
dotenv.config(); 
const PORT = process.env.PORT 

app.use(express.json()); 
app.use(morgan('dev')); 
app.use(express.urlencoded()); 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1/admin', adminRoutes); 
app.use('/api/v1/user', userRoutes); 
app.use('/auth', authRoutes); 
app.use(express.static('views'));

app.listen(PORT, () =>{
    connectDb(); 
    console.log(`Server is listening on ${PORT}`)
});
