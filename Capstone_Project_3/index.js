// 1.import necessay packages
// 2.add routes
// 3.create ejs views for each route
// 4.design css for the views
 
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
var blogs = [
  {
    id: 1,
    title: "Blog 1",
    content: "This is the content of blog 1.",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Blog 2",
    content: "This is the content of blog 2.",
    createdAt: new Date(),
  },
  {
    id: 3,
    title: "Blog 3",
    content: "This is the content of blog 3.",
    createdAt: new Date(),
  },
];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render("index.ejs", { blogs: blogs });
});

app.post("/update", (req, res) => {
  const blogId = parseInt(req.body.id);
  const updatedTitle = req.body.title;
  const updatedContent = req.body.content;

  // Find the blog and update it
  const blogIndex = blogs.findIndex((blog) => blog.id === blogId);

  if (blogIndex !== -1) {
    blogs[blogIndex].title = updatedTitle;
    blogs[blogIndex].content = updatedContent;
    // Optional: Update the timestamp
    blogs[blogIndex].createdAt = new Date();
  }
  else {
    blogs.push({
      id: blogId, 
      title: updatedTitle,
      content: updatedContent,
      createdAt: new Date(),
    });
  }


  res.redirect('/');
});


app.get("/add", (req, res) => {
  res.render("add.ejs",{id: blogs[blogs.length-1].id+1});}
);


app.get("/blogs/:id", (req, res) => {
    const blog = blogs.find((blog) => blog.id === parseInt(req.params.id));
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.render("blog.ejs", { blog: blog });
  });

app.get("/edit", (req, res) => {
  const blogId = parseInt(req.query.id);
  const blog = blogs.find((blog) => blog.id === blogId);  
  res.render("edit.ejs", {blog : blog });
});


app.post('/delete', (req, res) => { 
  const blogId = req.body.id;
  blogs = blogs.filter((blog) => blog.id !== parseInt(blogId));
  res.redirect('/');
});


app.get('/about', (req, res) => {
  res.render("about.ejs");  
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
