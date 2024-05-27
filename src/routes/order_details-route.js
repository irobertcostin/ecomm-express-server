
import errorHandler from "../middleware/error-handler.js";
import { getAllOrderDetails, getAllOrderDetailsByOrderIdNew, deleteOrderDetail, editOrderDetail } from "../controllers/order_details-controller.js";
import express from "express";
import { protectAllOrderDetailsRead, protectAllOrderDetailsWrite } from "../middleware/authentication.js";


const orderDetailsRouter = express.Router();

orderDetailsRouter.route('/')
    .get(protectAllOrderDetailsRead, getAllOrderDetails, errorHandler)

orderDetailsRouter.route('/orderId=:id')
    .get(getAllOrderDetailsByOrderIdNew, errorHandler)

orderDetailsRouter.route('/delete/id=:id')
    .delete(protectAllOrderDetailsWrite, deleteOrderDetail, errorHandler)

orderDetailsRouter.route('/edit/id=:id')
    .put(protectAllOrderDetailsWrite, editOrderDetail, errorHandler)

export default orderDetailsRouter;