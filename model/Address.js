const mongoose = require("mongoose")


const addressSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true

    },
    lastName: {
        type: String,
        required: true
    },


    email: {
        type: String,
        required: true
    },

    mobile: {
        type: Number,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

})

module.exports = mongoose.model("Address", addressSchema)