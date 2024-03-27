const mongoose = require("mongoose")


const cartScheme = new mongoose.Schema({
    quantity: {
        type: Number,
        default:1,
        min:1,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }

})

module.exports = mongoose.model("Cart", cartScheme)