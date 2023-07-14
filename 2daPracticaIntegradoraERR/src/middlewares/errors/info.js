export const generateUserErrorInfo = (user) => {
    return `One or more properties were imcomplete or not valid.
    List of required properties:
    * first_name: needs to be a string, received ${user.first_name}
    * last_name: needs to be a string, received ${user.last_name}
    * email: needs to be a string, received ${user.email}
    `
}

export const generateProductErrorInfo = (product) => {
    return `One or more properties were imcomplete or not valid.
    List of required properties:
    * title: needs to be a string, received ${product.title}
    * description: needs to be a string, received ${product.description}
    * code: needs to be a number, received ${product.code},
    * stock: needs to be a number, received ${product.stock},
    * price: needs to be a number, received ${product.price}
    `
}

export const generateProductInCartErrorInfo = (cart) => {
    return `One or more properties were imcomplete or not valid.
    List of required properties:
    * product: needs to be a string, received ${cart.product}
    * quantity: needs to be a number, received ${cart.quantity}
    `
}