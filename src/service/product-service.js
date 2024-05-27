async function editProduct(product, modifiedProduct) {
    try {
        if (product.name && product.name !== modifiedProduct.name) {
            product.name = modifiedProduct.name
            user.save();
        }
        if (newUser.email && newUser.email !== user.email) {
            user.email = newUser.email;
            user.save();
        }
    } catch (error) {
        return error
    }
}

export { editProduct }