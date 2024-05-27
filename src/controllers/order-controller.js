import db from "../config/db.js";
import { orderCheck, getOrdersByUser } from "../service/order-service.js";
import expressAsyncHandler from "express-async-handler";



const getAllOrders = expressAsyncHandler((async (req, res) => {
    const orders = await db.models.order.findAll();
    res.status(200).json(orders)
})
)



const getAllOrdersByCustomerId = expressAsyncHandler((async (req, res) => {
    const ids = [];
    ids.push(req.params.id)
    const orders = await getOrdersByUser(ids)
    if (orders.length > 0) {
        res.status(200).json(orders)
    } else {
        res.status(404).json("This user has no orders")
    }
})
)



const getOrderById = expressAsyncHandler((async (req, res) => {

    const id = req.params.id;
    const order = await db.models.order.findByPk(id);
    if (order) {
        res.status(200).json(order)
    } else {
        res.status(404).json("No orders by this ID")
    }
}))



const newOrder = expressAsyncHandler((async (req, res) => {

    const body = req.body
    await orderCheck(body);
    res.status(201).json({ success: "Accepted" })
})
)



const deleteOrder = expressAsyncHandler((async (req, res) => {
    const id = req.params.id
    const order = await db.models.order.findByPk(id);
    if (order) {
        await order.destroy();
        res.status(202).json('Successfully deleted')
    } else {
        res.status(404).json(`No object with id ${id} found`)
    }
})
)


export { newOrder, getAllOrders, getAllOrdersByCustomerId, getOrderById, deleteOrder }


