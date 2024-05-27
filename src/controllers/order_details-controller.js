import db from "../config/db.js";
import expressAsyncHandler from "express-async-handler";
import { getDetailsById } from "../service/order-details-service.js";


const getAllOrderDetails = expressAsyncHandler((async (req, res) => {
    const order_details = await db.models.order_details.findAll();
    res.status(200).json(order_details)
}))



const getAllOrderDetailsByOrderIdNew = expressAsyncHandler((async (req, res) => {
    const ids = [];
    ids.push(+req.params.id)
    let x;
    if (ids.length > 0) {
        x = await getDetailsById(ids);
    }
    if (x && x.length > 0) {
        res.status(200).json(x)
    } else {
        res.status(200).json({ info: "No order details found" })
    }
}))



const deleteOrderDetail = expressAsyncHandler((async (req, res) => {

    const id = req.params.id
    const order = await db.models.order_details.findByPk(id);
    if (order) {
        await order.destroy();
        res.status(202).json('Successfully deleted')
    } else {
        res.status(404).json(`No object with id ${id} found`)
    }
})
)


const editOrderDetail = expressAsyncHandler((async (req, res) => {

    const id = req.params.id
    const order = await db.models.order_details.findByPk(id);
    if (order) {
        const toEdit = req.body;
        if (toEdit.quantity != order.quantity) {
            order.update({
                quantity: toEdit.quantity
            })
            await order.save()
            res.status(202).end("Successfully edited")
        } else {
            res.status(200).json(`No changes made`)
        }
    } else {
        res.status(404).json(`No object with id ${id} found`)
    }
})
)

export { getAllOrderDetails, getAllOrderDetailsByOrderIdNew, deleteOrderDetail, editOrderDetail }