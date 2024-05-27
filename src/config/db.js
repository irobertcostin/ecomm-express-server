import { Sequelize } from "sequelize";
import product from "../models/product.js";
import order from "../models/order.js";
import order_details from "../models/order_details.js";
import customer from "../models/customer.js";
import dotenv from "dotenv"



dotenv.config();

const name = process.env.DB_NAME
const user = process.env.DB_USER
const pass = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const dialect = process.env.DB_DIAL



const connectDb = () => {
    try {
        const sequelizeObj = new Sequelize(
            name,
            user,
            pass,
            {
                host: host,
                dialect: "mysql"
            }
        )

        const db = {
            models: {}
        }


        db.Sequelize = Sequelize;
        db.sequelize = sequelizeObj;
        db.models.product = product(sequelizeObj);
        db.models.order = order(sequelizeObj);
        db.models.customer = customer(sequelizeObj);
        db.models.order_details = order_details(sequelizeObj);

        db.models.customer.hasMany(db.models.order, {
            onDeconste: "CASCADE",
            as: "fk_customer_id",
            foreignKey: {
                fieldName: "customer_id",
                allowNull: false
            }
        });

        db.models.order.belongsTo(db.models.customer, {
            as: "fk_customer_id",
            foreignKey: {
                fieldName: "customer_id",
                allowNull: false
            }
        })

        db.models.product.hasMany(db.models.order_details, {
            onDeconste: "CASCADE",
            as: "fk_product_id",
            foreignKey: {
                fieldName: "product_id",
                allowNull: false
            }
        })

        db.models.order_details.belongsTo(db.models.product, {
            as: "fk_product_id",
            foreignKey: {
                fieldName: "product_id",
                allowNull: false
            }
        })

        db.models.order.hasMany(db.models.order_details, {
            onDeconste: "CASCADE",
            as: "fk_order_id",
            foreignKey: {
                fieldName: "order_id",
                allowNull: false
            }
        })

        db.models.order_details.belongsTo(db.models.order, {
            as: "fk_order_id",
            foreignKey: {
                fieldName: "order_id",
                allowNull: false
            }
        })

        return db;

    } catch (error) {
        console.log(error);
    }
}


const db = connectDb();

export default db;