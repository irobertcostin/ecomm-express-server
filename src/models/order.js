import { Sequelize } from "sequelize";

export default (sequelize) => {
    class Order extends Sequelize.Model { }
    Order.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: Sequelize.INTEGER,
        },
    }, {
        sequelize,
        timestamps: false,
        createdAt: false,
        updatedAt: false
    })
    return Order;
}