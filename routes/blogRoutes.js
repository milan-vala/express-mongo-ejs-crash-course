const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/blogs/create", (req, res) => {
  res.render("blogs/create", { title: "Create" });
});

router.get("/blogs", (req, res) => {
  blogController.getBlogs(req, res);
});

router.get("/blogs/:id", blogController.getBlogDetails);

router.delete("/blogs/:id", blogController.deleteBlog);

router.post("/blogs", blogController.createBlog);

module.exports = router;