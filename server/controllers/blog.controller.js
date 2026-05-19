import errorHandler from "../helpers/errorHandler.js";
import Blog from "../models/blog.model.js";
import cloudinary from "../config/cloudinary.js";
import { encode } from "entities";
import Category from "../models/category.model.js";

const blogAdd = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);

    let featureImage = "";
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog",
        resource_type: "auto",
      });

      featureImage = uploadResult.secure_url;
    }

    const blog = new Blog({
      author: data.author,
      category: data.category,
      title: data.title,
      slug: data.slug,
      featureImage: featureImage,
      content: encode(data.content),
    });

    await blog.save();

    res.status(201).json({ success: true, message: "Blog add successfully!" });
  } catch (error) {
    next(error);
  }
};

const blogEdit = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      return next(errorHandler(400, "BlogId are required!"));
    }

    const data = JSON.parse(req.body.data);

    const blogData = await Blog.findById(blogId);
    if (!blogData) {
      return next(errorHandler(404, "Blog not found!"));
    }

    blogData.category = data.category;
    blogData.title = data.title;
    blogData.slug = data.slug;
    blogData.content = data.content;

    let featureImage = blogData.featureImage;
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog",
        resource_type: "auto",
      });

      featureImage = uploadResult.secure_url;
    }

    blogData.featureImage = featureImage;

    await blogData.save();

    res.status(200).json({
      success: true,
      message: "Blog update successfully!",
      blog: blogData,
    });
  } catch (error) {
    next(error);
  }
};

const blogDelete = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      return next(errorHandler(400, "BlogId are required!"));
    }

    const blogData = await Blog.findByIdAndDelete(blogId);
    if (!blogData) {
      return next(errorHandler(404, "Blog not found!"));
    }

    res.status(200).json({
      success: true,
      message: "Blog delete successfully!",
    });
  } catch (error) {
    next(error);
  }
};

const blogShow = async (req, res, next) => {
  try {
    const user = req.user;
    let blog;

    if (user.role === "admin") {
      blog = await Blog.find()
        .populate("author", "name avatar role")
        .populate("category", "name slug")
        .sort({ createdAt: -1 })
        .lean()
        .exec();
    } else {
      blog = await Blog.find({ author: user?._id })
        .populate("author", "name avatar role")
        .populate("category", "name slug")
        .sort({ createdAt: -1 })
        .lean()
        .exec();
    }

    res.status(200).json({
      success: true,
      message: "All blogs found successfully!",
      blog: blog,
    });
  } catch (error) {
    next(error);
  }
};

const blogAllShow = async (req, res, next) => {
  try {
    const blogData = await Blog.find()
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      success: true,
      message: "All blogs found successfully!",
      blog: blogData,
    });
  } catch (error) {
    next(error);
  }
};

const blogDetailsShow = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      return next(errorHandler(400, "BlogId are required!"));
    }

    const blogData = await Blog.findById(blogId).populate("category", "name");
    if (!blogData) {
      return next(errorHandler(404, "Blog not found!"));
    }

    res.status(200).json({
      success: true,
      message: "Blog detail found successfully!",
      blog: blogData,
    });
  } catch (error) {
    next(error);
  }
};

const blogDetailsSlugShow = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const blogData = await Blog.findOne({ slug })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .lean()
      .exec();

    res.status(200).json({
      success: true,
      message: "Blog detail slug found successfully!",
      blog: blogData,
    });
  } catch (error) {
    next(error);
  }
};

const getBlogByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const categoryData = await Category.findOne({ slug: category });
    if (!categoryData) {
      return next(errorHandler(404, "Category not found!"));
    }

    const categoryId = categoryData?._id;

    const blogData = await Blog.find({ category: categoryId })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .lean()
      .exec();

    res.status(200).json({
      success: true,
      message: "Category related blog found successfully!",
      blog: blogData,
    });
  } catch (error) {
    next(error);
  }
};

export {
  blogAdd,
  blogEdit,
  blogDelete,
  blogShow,
  blogDetailsShow,
  blogDetailsSlugShow,
  getBlogByCategory,
  blogAllShow,
};
