const Blog = require("../models/blog");

const getBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find().sort({ createdAt: -1 });
    res.render("blogs/index", { title: "All blogs", blogs });
  } catch (error) {
    console.log("error while fetching blogs: ", error);
  }
};

const getBlogDetails = async (req, res) => {
  try {
    let id = req.params.id;
    let blog = await Blog.findById(id);
    // res.render("index", { title: blog.title, blogs: [blog] });
    res.render("blogs/details", { title: "Blog Details", blog });
  } catch (error) {
    console.log("error while getting blog: ", error);
    res.status(404).render("404", { title: "Blog not found!" });
  }
};

const createBlog = async (req, res) => {
  try {
    let { title, snippet, body } = req.body;
    // let blog = new Blog({ title, snippet, body });
    // can do like this alos
    let blog = new Blog(req.body);
    await blog.save();
    res.redirect("/blogs");
  } catch (error) {
    console.log("error while saving data: ", error);
  }
};

const deleteBlog = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await Blog.findByIdAndDelete(id);
    console.log("result of delete ==>", result);
    res.json({ redirect: "/blogs" });
  } catch (error) {
    console.log("error while deleting blogs: ", error);
  }
};

module.exports = {
  getBlogs,
  getBlogDetails,
  createBlog,
  deleteBlog,
}