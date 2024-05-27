import db from "../config/db.js";
import { Sequelize } from "sequelize";
import { getDetailsById } from "./order-details-service.js";



async function getOrdersByUser(ids) {

    try {
        const orders = await db.models.order.findAll({
            where: {
                customer_id: {
                    [Sequelize.Op.in]: ids,
                }
            },
        });
        const orderIds = orders.map(e => e.id)

        const newOrders = []
        const orderDetails = await getDetailsById(orderIds)
        const allProducts = await db.models.product.findAll();;
        orders.forEach(element => {
            const dtl = orderDetails.filter(e => e.order_id === element.id)
            const productsInOrder = dtl.map(e => e.product_id)
            const prods = []
            productsInOrder.forEach(element => {
                const prod = allProducts.filter(product => product.id == element)
                prods.push(prod[0])
            })
            newOrders.push({
                order: element,
                order_details: dtl,
                order_products: prods
            })
        })
        return newOrders;
    } catch (error) {
        console.error(error);
    }
}


async function orderCheck(orderDto) {
    const { customer_id } = orderDto;
    const { order } = orderDto;
    const user = await db.models.customer.findByPk(customer_id);
    const amountTotal = 0;
    order.forEach(element => {
        amountTotal += element.price * element.quantity;
    })
    const newOrder = {
        amount: amountTotal,
        customer_id: user.id
    }
    const createdOrder = await db.models.order.create(newOrder);
    order.forEach(element => {
        const order_details = {
            price: element.price,
            quantity: element.quantity,
            product_id: element.id,
            order_id: createdOrder.id
        }
        db.models.order_details.create(order_details)
            .then((result) => {
                console.log("ok");
            }).catch((err) => {
                console.log(err);
            });
    })
}

export { orderCheck, getOrdersByUser }