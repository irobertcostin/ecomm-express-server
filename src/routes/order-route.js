import errorHandler from "../middleware/error-handler.js";
import express from "express"
import { newOrder, getAllOrders, getAllOrdersByCustomerId, getOrderById, deleteOrder } from "../controllers/order-controller.js"
import { protectCartWrite, protectOrderRead, protectOrderWrite } from "../middleware/authentication.js"



const orderRouter = express.Router();

orderRouter.route('/')
    .get(protectOrderRead, getAllOrders, errorHandler)

orderRouter.route('/customer-id=:id')
    .get(protectOrderRead, getAllOrdersByCustomerId, errorHandler)

orderRouter.route('/new')
    .post(protectCartWrite, newOrder, errorHandler)

orderRouter.route('/order-id=:id')
    .get(protectOrderRead, getOrderById, errorHandler)

orderRouter.route('/delete/id=:id')
    .delete(protectOrderWrite, deleteOrder, errorHandler)

orderRouter.route('/create-checkout-session')
    .post()

export default orderRouter;