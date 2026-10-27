import Orders from '../models/Orders.js'
import Task from '../models/Task.js';

export async function newTaskController(req,res) {
    try {
        const { date,time,order } = req.body;
        
        if (!date || !time || !order){
            return res.status(400).json({message: "All fields mandatory"})
        }
    
        const requestedOrder = await Orders.findOne({
            title:order,
            code:req.user.code
        })

        if (!requestedOrder){
            return res.status(404).json({message:"Order not Found"})
        }

        if(requestedOrder.taskCreated){
            return res.status(400).json({
                message: "Task already Created"
            })
        }

        const task = await Task.create({
                date,
                time,
                order,
                code:req.user.code
            })

        requestedOrder.taskCreated = true;
        requestedOrder.save();

        if (task){
            res.status(200).json({message:"Task created Successfully"})
        }else{
            res.status(400).json({message:"Error creating task"})
        }

    } catch (error) {
        res.status(500).json({message:`Error in newTaskController ${error}` })
    }    
}

export async function getAllTasksController(req,res) {
    try {
        
        if (req.user.role === 'ops'){
            const tasks = await Task.find();
            return res.status(200).json({
                tasks:tasks
            })
        }else{

            const tasks = await Task.find({
                code:req.user.code
            })

            if (tasks){
                return res.status(200).json({
                    tasks:tasks
                })
            }else{
                return res.status(400).json({
                    message:"No orders found"
                })
            }
        
        }
        
    } catch (error) {
        res.status(500).json({
            message:"error in getAllTasksController controller"
        })
    }
}

// don't think it's useful for 1.0

export async function getTaskByIdController(req,res) {
    try {
        const order = req.params
        const task = await Task.find({order})
        if (task){
            res.status(200).json({
                task:task
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"error in getAllTasksController controller"
        })
    }
}


export async function editTaskController(req,res) {
    try {
        const { date,time,order } = req.body
        const task = await Orders.findOne({order})
    
        if (date !== undefined) task.date = date;
        if (time !== undefined) task.time = time;

        await task.save()

        return res.status(200).json({message:'Task edited successfully'})
        
    } catch (error) {
        return res.status(500).json({message:'Error in editTaskController controller'})
    }


}

export async function deleteTaskController(req,res) {
    try {
        const { order } = req.body
        const task = await Orders.findOne({order})
        
        await task.deleteOne()
        
        return res.status(200).json({message:'Task deleted successfully'})
        
    } catch (error) {
        return res.status(500).json({message:'Error in deleteTaskController controller'})
    }

}