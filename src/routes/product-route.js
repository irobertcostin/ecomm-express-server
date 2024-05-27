import errorHandler from "../middleware/error-handler.js";
import express from "express"
import { getAllProducts, getProductById, newProduct, deleteProduct, editProduct } from "../controllers/product-controller.js"
import { protectAdmin, protectProductRead, protectProductWrite } from "../middleware/authentication.js";


const productRouter = express.Router();

productRouter.route("/")
    .get(getAllProducts, errorHandler)

productRouter.route("/:id")
    .get(protectProductRead, getProductById, errorHandler)

productRouter.route("/new")
    .post(protectProductWrite, newProduct, errorHandler)

productRouter.route("/delete/id=:id")
    .delete(protectProductWrite, deleteProduct, errorHandler)

productRouter.route("/edit/id=:id")
    .put(protectAdmin, editProduct, errorHandler)

export default productRouter;