import db from "../config/db.js";
import express from "express";
import expressAsyncHandler from "express-async-handler";


const getAllProducts = expressAsyncHandler((async (req, res) => {
    const products = await db.models.product.findAll();
    res.status(200).json(products)
})
)


const getProductById = expressAsyncHandler((async (req, res) => {
    const id = req.params.id;
    const product = await db.models.product.findByPk(id);
    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404).end(`No object with id ${id} found`)
    }
}))


const newProduct = expressAsyncHandler((async (req, res) => {
    const newProduct = req.body
    await db.models.product.create(newProduct);
    res.status(201).end('Successfully added a product')
})
)


const deleteProduct = expressAsyncHandler((async (req, res) => {
    const id = req.params.id
    const product = await db.models.product.findByPk(id);
    if (product) {
        await product.destroy();
        res.status(202).end('Successfully deconsted')
    } else {
        res.status(404).end(`No object with id ${id} found`)
    }
})
)


const editProduct = expressAsyncHandler((async (req, res) => {

    const id = req.params.id
    const product = await db.models.product.findByPk(id);
    if (product) {
        if (req.body.name) {
            product.set({ name: req.body.name })
            product.save();
        }
        if (req.body.price) {
            product.set({ price: req.body.price })
            product.save();
        }
        if (req.body.stock) {
            product.set({ stock: req.body.stock })
            product.save();
        }
        res.status(202).end("Successfully edited")
    } else {
        res.status(404).json(`No object with id ${id} found`)
    }
})
)

export { getAllProducts, getProductById, editProduct, newProduct, deleteProduct }