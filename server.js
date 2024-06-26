const express=require('express');
const dotenv=require("dotenv");
const cors=require('cors');
const morgan=require('morgan');
const colors=require('colors');
const connectDB = require("./config/db");
const path=require('path');

dotenv.config();
connectDB();
//rest object
const app=express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
 
//routes
//1 test route
app.use('/api/v1/test',require("./routes/testRoutes"));
app.use('/api/v1/auth',require("./routes/authRoutes"));
app.use('/api/v1/inventory',require("./routes/inventoryRoutes"));


app.use(express.static(path.join(__dirname,'./client/build')));
app.get("*",function(req,res){
 res.sendFile(path.join(__dirname,"./client/build/index.html"));
});
//port
const PORT=process.env.PORT || 8080;

//listen
app.listen(PORT,()=>{
    console.log(`app running on ${process.env.DEV_MODE} on port ${process.env.PORT}`);
});