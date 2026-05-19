import errorHandler from "../helpers/errorHandler.js";
import Comment from "../models/comment.model.js";

const commentAdd = async (req, res, next) => {
  try {
    const { author, blogId, comment } = req.body;

    if (!author || !blogId || !comment) {
      return next(errorHandler(400, "All fields are required!"));
    }

    const newComment = new Comment({
      author,
      blogId,
      comment,
    });

    await newComment.save();

    res.status(201).json({
      success: true,
      message: "Comment add successfully!",
      comment: newComment,
    });
  } catch (error) {
    next(error);
  }
};

const commentShow = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      return next(errorHandler(400, "BlogId are required!"));
    }

    const commentData = await Comment.find({ blogId })
      .populate("author", "name avatar")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      success: true,
      message: "All comments found successfully!",
      comment: commentData,
    });
  } catch (error) {
    next(error);
  }
};

const commentCount = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      return next(errorHandler(400, "BlogId are required!"));
    }

    const commentCountData = await Comment.countDocuments({ blogId });

    res.status(200).json({
      success: true,
      message: "All comments count found successfully!",
      commentCount: commentCountData,
    });
  } catch (error) {
    next(error);
  }
};

const commentAllShow = async (req, res, next) => {
  try {
    const user = req.user;
    let commentData;

    if (user.role === "admin") {
      commentData = await Comment.find()
        .populate("blogId", "title")
        .populate("author", "name");
    } else {
      commentData = await Comment.find({ author: user?._id })
        .populate("blogId", "title")
        .populate("author", "name");
    }

    res.status(200).json({
      success: true,
      message: "All comments found successfully!",
      comment: commentData,
    });
  } catch (error) {
    next(error);
  }
};

const commentDelete = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    if (!commentId) {
      return next(errorHandler(400, "CommentId are required!"));
    }

    const commentData = await Comment.findByIdAndDelete(commentId);
    if (!commentData) {
      return next(errorHandler(404, "Comment not found!"));
    }

    res.status(200).json({
      success: true,
      message: "Comment delete successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export { commentAdd, commentShow, commentCount, commentAllShow, commentDelete };
