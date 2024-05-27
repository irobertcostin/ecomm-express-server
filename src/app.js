import cors, { } from "cors";
import express from "express";
import db from "./config/db.js";
import productRouter from "./routes/product-route.js";
import customerRouter from "./routes/customer-route.js";
import orderRouter from "./routes/order-route.js";
import orderDetailsRouter from "./routes/order_details-route.js";
import populateDatabase from "./config/populateDB.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/orders", orderRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/customers", customerRouter)
app.use('/api/v1/order-details', orderDetailsRouter)


db.sequelize.sync().then((result) => {
    populateDatabase()
    app.listen(4242, () => {
        console.log("Successfully connected");
    })
})
