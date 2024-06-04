import User from "../models/User.js";
import { changeFile, deleteFile, uploadFile } from "../utils/file.js";
import Post from "./../models/Post.js";


const NUMBER_POST = 5;


export const getPost = async (req, res) => {
  const page = req.query.page;
  try {
    const skipPost = page * NUMBER_POST;
    const listPost = await Post.find({ isDelete: false, isLock: false })
      .sort({ _id: -1 })
      .skip(skipPost)
      .limit(5);
    return res
      .status(200)
      .json({ message: "Success", data: listPost, code: 0 });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", code: 4 });
  }
};
export const getPostPublic = async (req, res) => {
  const page = req.query.page;
  try {
    const skipPost = page * NUMBER_POST;
    const listPost = await Post.find({ privacy: "global", isDelete: false, isLock: false })
      .sort({ _id: -1 })
      .skip(skipPost)
      .limit(5);
    return res
      .status(200)
      .json({ message: "Success", data: listPost, code: 0 });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", code: 4 });
  }
};
export const getPostByUser = async (req, res) => {
  const userId = req.params.userId;
  const page = req.query.page;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: " User not exist", code: 3 });
    }
    const skipPost = page * NUMBER_POST;
    const listPost = await Post.find({ userId: userId, isDelete: false })
      .sort({ _id: -1 })
      .skip(skipPost)
      .limit(5);
    return res
      .status(200)
      .json({ message: "Success", data: listPost, code: 0 });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", code: 4 });
  }
};
export const deletePost = async (req, res) => {
  const userId = req.query.userId;
  const postId = req.query.postId;
  try {
    const post = await Post.findOne({ _id: postId, userId: userId });
    if (!post) {
      return res.status(404).json({ msg: "Not found post", code: 3 });
    } else {
      post.isDelete = true;
      await post.save();
      return res.status(200).json({ message: "Success delete", code: 0 });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", code: 4 });
  }
};
export const getPostByEvent = async (req, res) => {
  const page = req.query.page;
  const organizationId = req.query.organizationId;
  try {
    const skipPost = page * NUMBER_POST;
    const listPost = await Post.find({
      isDelete: false,
      isLock: false,
      organizationId: organizationId,
    })
      .sort({ _id: -1 })
      .skip(skipPost)
      .limit(5);
    return res
      .status(200)
      .json({ message: "Success", data: listPost, code: 0 });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", code: 4 });
  }
};