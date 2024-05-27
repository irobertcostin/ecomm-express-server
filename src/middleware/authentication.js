import expressAsyncHandler from "express-async-handler";
import db from "../config/db.js";
import Jwt from "jsonwebtoken";
import UserRole from "../permissions/roles.js";


const protectCustomerRead = expressAsyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = Jwt.verify(token, process.env.JWT_SECRET)
            req.user = await db.models.customer.findByPk(decoded.id)
            if (req.user.role == UserRole.ADMIN.getName()) {
                next();
            } else if (req.user.role == UserRole.CUSTOMER.getName()) {
                if (req.params.email) {
                    let filtered = await db.models.customer.findOne({
                        where: {
                            email: req.params.email
                        }
                    })
                    if (filtered.id === decoded.id) {
                        next();
                    } else {
                        res.status(401).json("Unauthorized")
                    }
                }
                else if (req.params.id) {
                    let filtered = await db.models.customer.findByPk(req.params.id)
                    if (filtered.id === decoded.id) {
                        next()
                    } else {
                        res.status(401).json("Unauthorized")
                    }
                } else {
                    res.status(401).json("Unauthorized")
                }
            } else {
                res.status(401).json("Unauthorized")
            }
        } catch (error) {
            res.status(401).json("Unauthorized")
        }
    }
    if (!token) {
        res.status(401).json("Unauthorized")
    }
})



const protectCustomerWrite = expressAsyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = Jwt.verify(token, process.env.JWT_SECRET)
            if (+req.params.id === decoded.id) {
                next();
            } else {
                res.status(401).json({ error: "Unauthorized" })
            }
        } catch (error) {
            res.status(401).json({ error: "Unauthorized" })
        }
    } if (!token) {
        res.status(401).json({ error: "Unauthorized" })
    }
})

const protectOrderRead = expressAsyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = Jwt.verify(token, process.env.JWT_SECRET)
            req.user = await db.models.customer.findByPk(decoded.id)
            if (+req.params.id === decoded.id) {
                next();
            } else {
                res.status(401).json("Unauthorized")
            }
        } catch (error) {
            res.status(401).json("Unauthorized")
        }
    } if (!token) {
        res.status(401).json("Unauthorized")
    }
})

const protectOrderWrite = expressAsyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = Jwt.verify(token, process.env.JWT_SECRET)
            req.user = await db.models.customer.findByPk(decoded.id)
            if (+req.params.id === decoded.id) {
                next();
            } else {
                res.status(401).json("Unauthorized")
            }
        } catch (error) {
            res.status(401).json("Unauthorized")
        }
    } if (!token) {
        res.status(401).json("Unauthorized")
    }
})


const protectAllOrderDetailsRead = expressAsyncHandler(async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = Jwt.verify(token, process.env.JWT_SECRET)
            req.user = await db.models.customer.findByPk(decoded.id)
            if (req.user) {
                next();
            } else {
                res.status(401).json("Unauthorized")
            }
        } catch (error) {
            res.status(401).json("Unauthorized")
        }
    } if (!token) {
        res.status(401).json("Unauthorized")
    }
})


const protectAllOrderDetailsWrite = expressAsyncHandler(async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = Jwt.verify(token, process.env.JWT_SECRET)
            req.user = await db.models.customer.findByPk(decoded.id)
            if (req.user) {
                next();
            } else {
                res.status(401).json("Unauthorized")
            }
        } catch (error) {
            res.status(401).json("Unauthorized")
        }
    } if (!token) {
        res.status(401).json("Unauthorized")
    }
})


const protectProductRead = expressAsyncHandler(async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = Jwt.verify(token, process.env.JWT_SECRET)
            req.user = await db.models.customer.findByPk(decoded.id)
            if (req.user) {
                next()
            }
            else {
                res.status(401).json("Unauthorized")
            }
        } catch (error) {
            res.status(401).json("Unauthorized")
        }
    } if (!token) {
        res.status(401).json("Unauthorized")
    }
})



const protectProductWrite = expressAsyncHandler(async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = Jwt.verify(token, process.env.JWT_SECRET)
            req.user = await db.models.customer.findByPk(decoded.id)
            if (req.user.role == UserRole.ADMIN.getName()) {
                next();
            } else {
                res.status(401).json("Customers cannot modify products")
            }
        } catch (error) {
            res.status(401).json("Unauthorized")
        }
    } if (!token) {
        res.status(401).json("Unauthorized")
    }
})


const protectCartWrite = expressAsyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = Jwt.verify(token, process.env.JWT_SECRET)
            req.user = await db.models.customer.findByPk(decoded.id)
            if (req.user.role == UserRole.CUSTOMER.getName()) {
                next();
            } else {
                res.status(401).json("Admins cannot purchase items")
            }
        } catch (error) {
            res.status(401).json("Unauthorized")
        }
    } if (!token) {
        res.status(401).json("Unauthorized")
    }
})


const protectAdmin = expressAsyncHandler(async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = Jwt.verify(token, process.env.JWT_SECRET)
            req.user = await db.models.customer.findByPk(decoded.id)
            if (req.user.role == UserRole.ADMIN.getName()) {
                next();
            } else {
                res.status(401).json("Unauthorized")
            }
        } catch (error) {
            res.status(401).json("Unauthorized")
        }
    } if (!token) {
        res.status(401).json("Unauthorized")
    }
})


export { protectCustomerRead, protectAdmin, protectCustomerWrite, protectOrderRead, protectOrderWrite, protectProductRead, protectProductWrite, protectCartWrite, protectAllOrderDetailsRead, protectAllOrderDetailsWrite };