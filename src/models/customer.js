import { Sequelize } from "sequelize";
import bcrypt from "bcrypt"


export default (sequelize) => {
    class Customer extends Sequelize.Model { }
    Customer.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                customValidator(value) {
                    if (!value.includes('@') || !value.endsWith('.com')) {
                        throw new Error('Email should contain "@" and end with ".com"');
                    }
                }
            }
        },
        password: {
            type: Sequelize.VIRTUAL,
            allowNull: false,
            validate: {
                is: /^(?=.*[A-Z]).{8,}$/i
            }
        },
        confirmedPassword: {
            type: Sequelize.STRING,
            allowNull: false,
            set(val) {
                if (val == this.password) {
                    const hashPassword = bcrypt.hashSync(val, 10)
                    this.setDataValue('confirmedPassword', hashPassword)
                }
            },
            validate: {
                is: /^(?=.*[A-Z]).{8,}$/i
            }
        },
        full_name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Provide full name"
                },
                notEmpty: {
                    msg: "Provide full name"
                }
            }
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Provide role"
                },
                notEmpty: {
                    msg: "Provide role"
                }
            }
        }
    }, {
        sequelize,
        timestamps: false,
        createdAt: false,
        updatedAt: false
    })
    return Customer;
}