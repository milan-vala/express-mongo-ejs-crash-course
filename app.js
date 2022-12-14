const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

// connect to mongodb
const dbURI = "mongodb+srv://milan:milan123@express-tutorials.dabhuej.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI)
  .then(result => {
    console.log("connected to db.")
    app.listen(3000);
  })
  .catch(error => console.log("error while connecting to db.", error));

// register view engine
app.set("view engine", "ejs");

// listen for requests
// app.listen(3000);

// middleware & static files
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// app.use(function (req, res, next){
//   console.log("new request made.");
//   console.log("host: ", req.hostname);
//   console.log("path: ", req.path);
//   console.log("method: ", req.method);
//   next();
// });

// app.use(function (req, res, next){
//   console.log("in the next middlewear.");
//   next();
// });

// mongoose and mongo sendbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "second blog",
    snippet: "second about my new blog",
    body: "second more about my new blog",
  });

  blog.save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => console.log("error: ", error));
});

app.get("/all-blogs", async (req, res) => {
  try {
    let data = await Blog.find();
    res.send(data);
  } catch (error) {
    console.log("error: ", error);
  }
});

app.get("/single-blog", async (req, res) => {
  try {
    let blog = await Blog.findById("63187658b294980ec22a4910");
    res.send(blog);
  } catch (error) {
    console.log("error: ", error);
  }
})
// mongoose and mongo sendbox routes

app.get("/", (req, res) => {
  // let blogs = [
  //   { title: "milan", snippet: "dummy text dummy text dummy text dummy text" },
  //   { title: "bob", snippet: "dummy text dummy text dummy text dummy text" },
  //   { title: "john", snippet: "dummy text dummy text dummy text dummy text" },
  // ]
  // res.render("index", { title: "Home", blogs });
  res.redirect("/blogs");
});

app.use(blogRoutes);

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
})

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
})