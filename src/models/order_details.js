import { Sequelize } from "sequelize";

export default (sequelize) => {
    class OrderDetails extends Sequelize.Model { }
    OrderDetails.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: false,
        createdAt: false,
        updatedAt: false
    })
    return OrderDetails;
}