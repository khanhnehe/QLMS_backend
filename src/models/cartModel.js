const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    sach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sach',
        required: true
    },
    image: {
        type: Array,
    },
    name: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
});

const cartSchema = new mongoose.Schema({
    docgia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DocGia',
        required: true
    },
    cartItems: [cartItemSchema],

    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;