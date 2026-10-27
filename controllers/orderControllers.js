import Orders from "../models/Orders.js";

export async function getAllOrders(req,res) {
    try {
        if (req.user.role === 'ops'){
            const orders = await Orders.find();
            if (orders){
                return res.status(200).json({
                    orders
                })
            }else{
                return res.status(404).json({
                    message:"No orders found"
                })
            }
        }else{
            const orders = await Orders.find({
                code:req.user.code
            })
            if (orders){
                return res.status(200).json({
                    orders
                })
            }else{
                return res.status(400).json({
                    message:"No orders found"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            message:"Error in getAllOrders controller"
        })
    }
}    

export async function getOrderDetails(req,res) {
    try {
        const title = req.params.number;
    
        const order = await Orders.findOne({
            title:title,
            code:req.user.code
        })
    
        if (!order){
            return res.status(404).json({message:"Order not Found"})
        }
    
        return res.status(200).json({
            title:order.title,
            code:order.code,
            taskCreated:order.taskCreated
        })
    } catch (error) {
        res.status(500).json({
            message:"Error in getOrderDetailsController"
        })
    }

}

