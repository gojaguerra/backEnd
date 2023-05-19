/* import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: Array,
        default: []
    }
});

export const cartModel = mongoose.model(cartCollection, cartSchema); */

import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                }
            }
        ],
        default: []
    }
});

cartSchema.pre('find', function () {
    this.populate('products.product');
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
