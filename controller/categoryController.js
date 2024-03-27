const Category = require("../model/Category")


exports.addCategory = async (req, res) => {

    try {
        const title = req.body.title
        const category = await Category.create({
            title
        })

        res.status(201).json({
            category,
            message: "category added successfully",
            success: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            success: false
        })
    }

}


exports.editCategory = async (req, res) => {
    try {
        const id = req.params.id
        const title = req.body.title


        const checkCategoryIsPresent = await Category.findOne({title: title})

        if (checkCategoryIsPresent) {
            return res.status(400).json({
                message: "category is already present",
                success: false
            })
        }

        const category = await Category.findOneAndUpdate({_id: id}, {
            title: title
        }, {new: true})

        res.status(200).json({
            category,
            message: "category updated successfully",
            success: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id
        const category = await Category.findByIdAndDelete(id)

        res.status(200).json({
            category,
            message: "category deleted successfully",
            success: true,
            id:category._id
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


exports.getCategoryById = async (req, res) => {

    try {

        const id = req.params.id


        const category = await Category.findById(id)

        res.status(200).json({
            message: "category fetch successfully",
            success: true,
            category
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            success: false
        })

    }


}
exports.getAllCategory = async (req, res) => {
    try {
        const category = await Category.find()
        
      

        res.status(200).json({
            message: " all category fetched successfully",
            success: true,
            category
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            success: false
        })

    }


}
