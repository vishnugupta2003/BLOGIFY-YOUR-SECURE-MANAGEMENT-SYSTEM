const { blogCategory } = require('../model/blog');

const getBlogCategory = async (req, res) => {
  try {
    let { _id, title } = req.query;
    title = title?.toLowerCase();
    if (_id || title) {
      const BlogCategory = await blogCategory.findOne({
        $or: [{ _id }, { title }],
      });
      if (!BlogCategory) {
        return res.status(400).json({ status: 'BlogCategory not found' });
      }
      return res
        .status(200)
        .json({ status: 'blogCategory fetch succesfully', BlogCategory });
    }
    const BlogCategory = await blogCategory.find({});
    return res
      .status(200)
      .json({ status: 'blog get successfully', BlogCategory });
  } catch (err) {
    return res.status(500).json({ status: 'Internal server error.' });
  }
};

const createBlogCategory = async (req, res) => {
  // is auth
  // is admin
  // console.log(req.user);
  try {
    let { title } = req.body;

    if (!title) {
      return res.status(400).json({ status: 'category not found' });
    }
    title = title.toLowerCase();
    let category = await blogCategory.findOne({ title });
    // console.log(category);
    if (category) {
      return res.status(400).json({ status: 'title alredy exits' });
    }
    category = blogCategory({ title });
    category = await category.save();
    return res
      .status(201)
      .json({ status: 'blogCategory created successfully', category });
  } catch (err) {
    return res.status(500).json({ status: 'Internal server error.' });
  }
};

const updateBlogCategory = async (req, res) => {
  const { _id } = req.query;
  await blogCategory.findByIdAndUpdate(_id, req.body);
  return res.status(200).json({ status: 'blog updated sucessfully' });
};

const deleteBlogCategory = async (req, res) => {
  const { _id } = req.query;
  await blogCategory.findByIdAndDelete(_id);
  return res.status(200).json({ status: 'delete blog successfully' });
};

module.exports = {
  getBlogCategory,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
