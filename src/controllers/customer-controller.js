import db from "../config/db.js";
import expressAsyncHandler from "express-async-handler";
import generateToken from "../utils/utils.js";
import bcrypt from "bcrypt";
import { editUser } from "../service/customer-service.js";


const getAllCustomers = expressAsyncHandler((async (req, res) => {
    const customers = await db.models.customer.findAll();
    res.status(200).json(customers)
})
)



const newCustomer = expressAsyncHandler((async (req, res) => {
    const newCustomer = req.body
    const foundUser = await db.models.customer.findOne({
        where: {
            email: newCustomer.email,
        }
    })
    if (foundUser) {
        res.status(403).json({
            error: `This email address is already registered`
        })
    } else {
        const user = await db.models.customer.create(newCustomer);
        res.status(201).json({
            token: generateToken(user.id, user.role, user.email, user.full_name)
        });
    }
})
)



const getCustomerById = expressAsyncHandler((async (req, res) => {
    const customer = await db.models.customer.findByPk(req.params.id);
    const resp = {
        id: customer.id,
        email: customer.email,
        full_name: customer.full_name,
        role: customer.role
    }
    if (customer) {
        res.status(200).json(resp)
    } else {
        res.status(404).end(`No object with id ${id} found`)
    }
}))



const getCustomerByEmail = expressAsyncHandler((async (req, res) => {
    const email = req.params.email;
    const customers = await db.models.customer.findAll();
    const x = customers.filter(e => e.email == email)
    if (x) {
        res.status(200).json(x[0])
    } else {
        res.status(404).end(`No object with id ${id} found`)
    }
}))







const deleteCustomer = expressAsyncHandler((async (req, res) => {
    const id = req.params.id
    const customer = await db.models.customer.findByPk(id);
    if (customer) {
        await customer.destroy();
        res.status(202).json({ success: 'Successfully deleted' })
    } else {
        res.status(404).json({ error: `No object with id ${id} found` })
    }
})
)


const editCustomerEmail = expressAsyncHandler((async (req, res) => {
    const id = req.params.id
    const customer = await db.models.customer.findByPk(id);
    const attempt = await db.models.customer.findOne({
        where: {
            email: req.body.email
        }
    })
    if (attempt) {
        res.status(401).json({ error: "This email address is already associated to another account" })
    } else {
        if (customer) {
            const newCustomer = req.body;
            await editUser(customer, newCustomer)
            res.status(202).json("Successfully edited")
        } else {
            res.status(404).json(`No object with id ${id} found`)
        }
    }
})
)


const editCustomerPass = expressAsyncHandler((async (req, res) => {

    const id = req.params.id
    const customer = await db.models.customer.findByPk(id);
    if (customer) {
        const newPass = req.body.pass;
        const hashed = await bcrypt.hash(newPass, 10)
        await customer.setDataValue("confirmedPassword", hashed)
        await customer.save();
        res.status(202).json("Successfully edited")
    } else {
        res.status(404).json({ error: `No object with id ${id} found` })
    }
})
)


const grantAdmin = expressAsyncHandler((async (req, res) => {
    const id = req.params.id
    const customer = await db.models.customer.findByPk(id);
    if (customer.role) {
        if (customer.role === "customer") {
            customer.set({
                role: "admin"
            })
            customer.save();
            res.status(202).end({ success: "Granted admin privileges" })
        } else {
            res.status(202).end({ info: "Already admin privileges" })
        }
    } else {
        res.status(404).json({ error: `No object with id ${id} found` })
    }
})
)



const login = expressAsyncHandler((async (req, res) => {
    const foundUser = await db.models.customer.findOne({
        where: {
            email: req.body.email,
        }
    })
    if (foundUser) {
        const check = bcrypt.compareSync(req.body.password, foundUser.confirmedPassword)
        if (check) {
            res.status(202).json({
                user: {
                    token: generateToken(foundUser.id, foundUser.role, foundUser.email, foundUser.full_name)
                }
            })
        } else {
            res.status(401).json({
                error: `Unauthorized: false password`
            })
        }
    } else {
        res.status(404).json({
            error: `Have you registered yet?`
        })
    }
}))


export { getAllCustomers, getCustomerById, newCustomer, editCustomerEmail, deleteCustomer, getCustomerByEmail, login, grantAdmin, editCustomerPass }

