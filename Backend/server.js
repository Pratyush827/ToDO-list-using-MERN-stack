import express from "express";
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js"
import todoRoutes from "./routes/todo.route.js"
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
//app.use(cors());

app.use('/api/todos', todoRoutes)

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "/Frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "Frontend", "dist" , "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})
