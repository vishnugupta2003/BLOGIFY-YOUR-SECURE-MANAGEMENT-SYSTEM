const express = require('express');
const {
  getBlogCategory,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} = require('../controller/blogCategory');
const { authenticate, isAdmin } = require('../middleware/auth');
const {
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controller/blog');
const {
  getBlogContent,
  createBlogContent,
  updateBlogContent,
  deleteBlogContent,
} = require('../controller/blogContent');

const blogRouter = express.Router();

blogRouter
  .route('/blog-category')
  .get(getBlogCategory)
  .post(authenticate, isAdmin, createBlogCategory)
  .put(authenticate, isAdmin, updateBlogCategory)
  .delete(authenticate, isAdmin, deleteBlogCategory);
blogRouter
  .route('/')
  .get(getBlog)
  .post(authenticate, createBlog)
  .put(authenticate, updateBlog)
  .delete(authenticate, deleteBlog);
blogRouter
  .route('/blog-content')
  .get(getBlogContent)
  .post(authenticate, createBlogContent)
  .put(authenticate, updateBlogContent)
  .delete(authenticate, deleteBlogContent);

module.exports = { blogRouter };
