// const express = require('express');
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
import authroutes from './routes/authrouter.js';
import messageRouter from './routes/messageRouter.js';
import userRouter from './routes/userRouter.js';
import groupRouter from './routes/groupRouter.js'

import cookieParser from 'cookie-parser';
import cors from 'cors';
import {app,server} from './socket/socket.js';
import path from 'path';

dotenv.config(); // this is used to run on server defined in .env



app.use(express.json()); //to get data from req.body in controllers
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 3002; 

const __dirname = path.resolve();

app.get('/', (req,res) => {
    console.log('hello');
    console.log('welcome to backend  ankit');
    res.send('hello@!!');
    // res.send('hie');
})

app.use('/api/auth',authroutes);
app.use('/api/message',messageRouter)
app.use('/api/user',userRouter)
app.use('/api/group',groupRouter)

app.use(express.static(path.join(__dirname, "/frontend/build")))

app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"))
})

const connectToMongoDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017',{
            dbName: 'chat_app'
        });
        
        console.log('DB connection successfull');
    }
    catch(error){
        console.log('error in connecting to DB',error.message);
    }
};


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectToMongoDB();
});