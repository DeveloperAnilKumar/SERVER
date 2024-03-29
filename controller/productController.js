const Product = require("../model/Product");
const Category = require("../model/Category");
const imageUploader = require("../utils/ImageUploader");
const { imageUploadToCloudinary } = require("../utils/ImageUploader");

exports.addProduct = async (req, res) => {
  try {
    const { name, size, color, description, price, category, stock } = req.body;

    const image = req.files.image;

    console.log(req.body);

    if (
      !name ||
      !size ||
      !color ||
      !description ||
      !price ||
      !category ||
      !image ||
      !stock
    ) {
      return res.status(400).json({
        message: "all filed required",
        success: false,
      });
    }

    const uploadImage = await imageUploader.imageUploadToCloudinary(
      image,
      process.env.FOLDER_NAME
    );

    const newCategory = await Category.findOne({ title: category });

    const product = await Product.create({
      name,
      size,
      color,
      description,
      price,
      category: newCategory._id,
      image: uploadImage.secure_url,
      image_id: uploadImage.public_id,
      stock,
    });

    res.status(201).json({
      message: "product added successfully",
      product,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
exports.editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, size, color, description, price, category, stock } = req.body;
    const image = req.files.image;

    if (
      !name ||
      !size ||
      !color ||
      !description ||
      !price ||
      !category ||
      !image ||
      !stock
    ) {
      return res.status(400).json({
        message: "all filed required",
        success: false,
      });
    }
    const new_product = await Product.findById({ _id: id });

    const newCategory = await Category.findOne({ title: category });

    console.log(new_product);

    const uploadImageUrl = await imageUploadToCloudinary(
      image,
      process.env.FOLDER_NAME
    );

    const uploadImage = await imageUploader.deleteImage(new_product.image_id);

    const product = await Product.findOneAndUpdate(
      { _id: id },
      {
        name,
        size,
        color,
        description,
        price,
        category: newCategory._id,
        image: uploadImageUrl.secure_url,
        image_id: uploadImageUrl.public_id,
        stock,
      },
      { new: true }
    );

    res.status(201).json({
      message: "product updated successfully",
      product,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const new_product = await Product.findByIdAndDelete(id);

    if (new_product.image_id) {
      await imageUploader.deleteImage(new_product.image_id);
    }

    res.status(201).json({
      message: "product deleted successfully",
      status: true,
      id: new_product._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    res.status(201).json({
      message: "product fetch successfully",
      product,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 25;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    const product = await Product.find()
      .populate("category")
      .limit(limit)
      .skip(startIndex);

    const pagination = {
      currentPage: page,
      totalPages: totalPages,
      totalProducts: totalProducts,
    };

    res.status(200).json({
      message: "All products fetched successfully",
      product,
      pagination,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

exports.getCategoryByProduct = async (req, res) => {
  try {
    const categoryId = req.params.category;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find({ category: categoryId })
      .skip(skip)
      .limit(limit);

    const totalCount = await Product.countDocuments({ category: categoryId });

    res.status(200).json({
      success: true,
      message: "Category products fetched successfully",
      products,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Issue with fetching category products",
      error: error.message,
    });
  }
};

exports.getManProducts = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find({ category: categoryId })
      .skip(skip)
      .limit(limit);

    const totalCount = await Product.countDocuments({ category: categoryId });

    res.status(200).json({
      success: true,
      message: "Category products fetched successfully",
      products,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Issue with fetching category products",
      error: error.message,
    });
  }
};

exports.getWomanProducts = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find({ category: categoryId })
      .skip(skip)
      .limit(limit);

    const totalCount = await Product.countDocuments({ category: categoryId });

    res.status(200).json({
      success: true,
      message: "Category products fetched successfully",
      products,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Issue with fetching category products",
      error: error.message,
    });
  }
};

exports.getKidsProducts = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find({ category: categoryId })
      .skip(skip)
      .limit(limit);

    const totalCount = await Product.countDocuments({ category: categoryId });

    res.status(200).json({
      success: true,
      message: "Category products fetched successfully",
      products,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Issue with fetching category products",
      error: error.message,
    });
  }
};

exports.searchProduct = async (req, res) => {
  try {
    const { q } = req.query;

    const searchResults = await Product.find({
      $or: [
        { name: { $regex: new RegExp(q, "i") } },
        { description: { $regex: new RegExp(q, "i") } },
      ],
    }).populate("category");

    res.json(searchResults);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
