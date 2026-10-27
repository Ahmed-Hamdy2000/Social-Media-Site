import Orders from '../models/Orders.js'
import Task from '../models/Task.js'

const userOrderOnly = async (req,res,next) =>{    
    const { requestedOrderNumber,requestedCompCode } = req.body

    const order = await Orders.findOne({title:requestedOrderNumber})
   
    if (req.user.role !== 'ops'){
        if (!order){
        return res.status(404).json({message:"Order not found"})
    }

    if (order.code !== requestedCompCode){
        return res.status(404).json({message:"Access not granted"})
    }
    }
    next()
}

export default userOrderOnly