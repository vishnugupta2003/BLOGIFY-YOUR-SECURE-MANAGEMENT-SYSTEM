const { blogCategory, blog } = require('../model/blog');
const { v4: uuidv4 } = require('uuid');
const getBlog = async (req, res) => {
  //all blog
  //_id,category,author,url
  //title,content
  let { search, ...restQuery } = req.query;
  restQuery = { ...restQuery, title: new RegExp(search, 'i') };

  const blogs = await blog.find(restQuery).populate('content author');

  return res.status(200).json({ status: 'Fetch blog successfully', blogs });
};
const createBlog = async (req, res) => {
  const { user } = req;
  let { category, title } = req.body;
  category = await blogCategory.findById(category);
  if (!category) {
    return res.status(404).json({ error: 'Invalid category Id' });
  }
  if (!title || title?.trim()?.split(' ')?.length < 3) {
    return res.status(400).json({ error: 'Pass the correct title' });
  }
  let url = title?.toLowerCase().split(' ').join('-');
  const isExistUrl = await blog.findOne({ url });
  if (isExistUrl) {
    url = `${url}-${uuidv4().toString().slice(0, 6)}`;
  }
  const data = {
    category,
    author: user._id,
    title,
    url,
  };
  const Blog = blog(data);
  await Blog.save();

  return res.status(201).json({ status: 'create blog successfully', Blog });
};
const updateBlog = async (req, res) => {
  const { _id } = req.query;
  let Blog = await blog.findById(_id);

  if (!Blog) {
    return res.status(404).json({ error: 'blog not found from id search' });
  }
  // check blog author and loggedin user same if not then not able to update blog
  if (req.user._id?.toString() !== Blog?.author?.toString()) {
    return res
      .status(401)
      .json({ error: 'you are unauthorize to update this blog' });
  }
  Blog.title = req.body.title;
  await Blog.save();

  return res.status(200).json({ status: 'Update blog successfully', Blog });
};
const deleteBlog = async (req, res) => {
  const { _id } = req.query;
  await blog.findByIdAndDelete(_id);
  return res.status(200).json({ status: 'Delete blog successfully' });
};

module.exports = { getBlog, createBlog, updateBlog, deleteBlog };

// solve function question when we have given a array of function and first function output send into second function as a argument to be anynumber and second function is not a function then execute last function of array.
