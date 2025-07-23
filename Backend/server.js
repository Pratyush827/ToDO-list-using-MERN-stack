import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js";
import todoRoutes from './routes/todo.route.js';

dotenv.config();

const app=express();

app.use(express.json());

app.use('/api/todos', todoRoutes)
app.get('/api', (req , res)=>{
    res.send("This is the API endpoint");
});
app.listen(port, (req , res)=>{
    console.log('Server is running at port '+ port);
    connectDB();
})