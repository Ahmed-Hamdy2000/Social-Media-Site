import mongoose from "mongoose";

const ordersShema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        unique: true,
    },
    code:{
        type:String,
        required:true,
    },
    taskCreated:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const Orders = mongoose.model("Order",ordersShema)
export default Orders