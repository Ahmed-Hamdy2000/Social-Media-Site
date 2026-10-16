import "dotenv/config"
import express, { json } from 'express'
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT

app.use(express.json())

// app.use('/api/users',userRoutes)

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on PORT ${PORT}`)
});
});



