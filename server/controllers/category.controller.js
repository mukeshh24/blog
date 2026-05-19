import errorHandler from "../helpers/errorHandler.js";
import Category from "../models/category.model.js";

const categoryAdd = async (req, res, next) => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      return next(errorHandler(400, "All fields are required!"));
    }

    const newCategory = new Category({ name, slug });
    await newCategory.save();

    res
      .status(201)
      .json({ success: true, message: "Category add successfully!" });
  } catch (error) {
    next(error);
  }
};

const categoryEdit = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    if (!name || !slug) {
      return next(errorHandler(400, "All fields are required!"));
    }

    const { categoryId } = req.params;
    if (!categoryId) {
      return next(errorHandler(400, "CategoryId are required!"));
    }

    const categoryData = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug,
      },
      { new: true },
    );
    if (!categoryData) {
      return next(errorHandler(404, "Category not found!"));
    }

    res.status(200).json({
      success: true,
      message: "Category update successfully!",
      category: categoryData,
    });
  } catch (error) {
    next(error);
  }
};

const categoryDelete = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return next(errorHandler(400, "CategoryId are required!"));
    }

    const categoryData = await Category.findByIdAndDelete(categoryId);
    if (!categoryData) {
      return next(errorHandler(404, "Category not found!"));
    }

    res.status(200).json({
      success: true,
      message: "Category delete successfully!",
    });
  } catch (error) {
    next(error);
  }
};

const categoryShow = async (req, res, next) => {
  try {
    const categoryData = await Category.find().sort({ name: -1 }).lean().exec();

    res.status(200).json({
      success: true,
      message: "All categories found successfully!",
      category: categoryData,
    });
  } catch (error) {
    next(error);
  }
};

const categoryDetailsShow = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return next(errorHandler(400, "CategoryId are required!"));
    }

    const categoryData = await Category.findById(categoryId);
    if (!categoryData) {
      return next(errorHandler(404, "Category not found!"));
    }

    res.status(200).json({
      success: true,
      message: "Category found successfully!",
      category: categoryData,
    });
  } catch (error) {
    next(error);
  }
};

export {
  categoryAdd,
  categoryEdit,
  categoryDelete,
  categoryShow,
  categoryDetailsShow,
};
