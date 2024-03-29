const Cart = require("../model/Cart")
const User = require("../model/User")


exports.addToCart = async (req, res) => {
    try {
        const id = req.user.id
        const product   = {...req.body}
        const cart = new Cart({product:product._id, user: id})
        const doc = await cart.save()
        const result = await doc.populate("product")
        res.status(201).json({
            message: "item added successfully",
            success: true,
            result
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.messages, success: false
        })
    }


}

exports.updateCart = async (req, res)=>{

    try {
        const userId = req.user.id

        const {quantity,id} = req.body

        const  updatedCartItem = await Cart.findOneAndUpdate({_id:id}, {quantity:quantity} , {new:true}).populate("product")

        res.status(201).json({
            message: "item updated successfully",
            success: true,
            updatedCartItem
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.messages, success: false
        })
    }

}

exports.deleteCart = async (req, res)=>{

    try {
        const id = req.user.id
        const  updatedCartItem = await Cart.findOneAndDelete({user:id})
        res.status(201).json({
            message: "item remove successfully",
            success: true,
            updatedCartItem
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.messages, success: false
        })
    }

}

exports.getCartItems = async (req, res)=>{
    try {
        const id = req.params.id
        const  updatedCartItem = await Cart.find({user:id}).populate("product")
        res.status(201).json({
            message: "all item fetch successfully",
            success: true,
            updatedCartItem
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.messages, success: false
        })
    }

}


exports.removeAllCartItems = async(req ,res)=>{

   try {
        const  updatedCartItem = await Cart.deleteMany({});
        res.status(200).json({
            message: "all cart items removed successfully",
            success: true,
            updatedCartItem
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.messages, success: false
        })
    }


}