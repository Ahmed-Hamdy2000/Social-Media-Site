import "dotenv/config"
import express from 'express'
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import tasksRoutes from "./routes/tasksRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

const app = express();
const PORT = process.env.PORT

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/tasks', tasksRoutes)
app.use('/api/orders', orderRoutes)

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on PORT ${PORT}`)
});
});



