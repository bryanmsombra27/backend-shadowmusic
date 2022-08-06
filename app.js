const express = require('express');
const {json,urlencoded} = require('express');
const cors = require('cors');
const app = express();

//middlewares
app.use(cors());
app.use(json());
app.use(urlencoded({extended:false}));


//routes
const authRoutes = require('./routes/authRoutes');



app.use("/api",authRoutes);





module.exports = app;