import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Please add Date']
    
    },
    time: {
        type: String,
        enum: ['morning','night'],
        required: [true, 'Please add Time']
    },
    completed:{
        type: Boolean,
        default: false
    },
    order:{
        type: String,
        required: [true, "Please enter order number"],
        lowercase:true,
        trim: true
    },
    code:{
        type:String
    },
    rescheduleRequest:{
        type:Boolean,
        default: false
    }
    
},
{timestamps:true}
)

const Task = mongoose.model("Task", taskSchema)
export default Task