import errorHandler from "../helpers/errorHandler.js";
import Like from "../models/like.model.js";

const likeAdd = async (req, res, next) => {
  try {
    const { author, blogId } = req.body;

    if (!author || !blogId) {
      return next(errorHandler(400, "All fields are required!"));
    }

    let like;

    like = await Like.findOne({ author, blogId });

    let message = "";

    if (!like) {
      const addLike = new Like({ author, blogId });

      like = await addLike.save();

      message = "Like added successfully!";
    } else {
      await Like.findByIdAndDelete(like._id);

      message = "Like removed successfully!";
    }

    const likeCount = await Like.countDocuments({ blogId });

    res.status(200).json({
      success: true,
      message,
      like: likeCount,
    });
  } catch (error) {
    next(error);
  }
};

const likeCount = async (req, res, next) => {
  try {
    const { blogId, authorId } = req.params;

    if (!blogId) {
      return next(errorHandler(400, "BlogId is required!"));
    }

    const likeCount = await Like.countDocuments({ blogId });

    res.status(200).json({
      success: true,
      message: "Like count found successfully!",
      like: likeCount,
    });
  } catch (error) {
    next(error);
  }
};

export { likeAdd, likeCount };
