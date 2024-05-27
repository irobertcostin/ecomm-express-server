import errorHandler from "../middleware/error-handler.js";
import express from "express"
import { login, getAllCustomers, getCustomerById, newCustomer, grantAdmin, editCustomerEmail, deleteCustomer, getCustomerByEmail, editCustomerPass } from "../controllers/customer-controller.js"
import { protectCustomerRead, protectCustomerWrite, protectAdmin } from "../middleware/authentication.js"


const customerRouter = express.Router();

customerRouter.route('/login')
    .post(login, errorHandler)

customerRouter.route('/register')
    .post(newCustomer, errorHandler)

customerRouter.route('/')
    .get(protectCustomerRead, getAllCustomers, errorHandler)

customerRouter.route('/email=:email')
    .get(protectCustomerRead, getCustomerByEmail, errorHandler)

customerRouter.route('/id=:id')
    .get(protectCustomerRead, getCustomerById, errorHandler)

customerRouter.route('/delete/id=:id')
    .delete(protectCustomerWrite, deleteCustomer, errorHandler)

customerRouter.route('/edit/id=:id')
    .put(protectCustomerWrite, editCustomerEmail, errorHandler)

customerRouter.route('/change-password/id=:id')
    .put(protectCustomerWrite, editCustomerPass, errorHandler)

customerRouter.route('/grantadmin/id=:id')
    .put(protectAdmin, grantAdmin, errorHandler)

export default customerRouter;