
import db from "../config/db.js";
import { Sequelize } from "sequelize";


async function getDetailsById(id) {
    try {
        const order_details = await db.models.order_details.findAll({
            where: {
                order_id: {
                    [Sequelize.Op.in]: id,
                }
            }
        });
        return order_details;
    } catch (error) {
        return error
    }
}

async function getProdPic(id) {
    try {
        const picture = await db.models.product.findByPk(id)
        return picture.url;
    } catch (error) {
        return error;
    }
}

export { getDetailsById, getProdPic }