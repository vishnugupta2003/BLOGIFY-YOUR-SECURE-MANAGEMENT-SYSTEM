const { blogContent, blog } = require('../model/blog');

const getBlogContent = async (req, res) => {
  const { _id } = req.query;
  if (_id) {
    var content = await blogContent.findById(_id);
    if (!content) {
      return res.status(400).json({ error: 'Invalid content Id ' });
    }
    return res
      .status(200)
      .json({ status: 'BlogContent fetch successfully', content });
  }
  content = await blogContent.find();
  return res
    .status(200)
    .json({ status: 'BlogContent fetch successfully', content });
};
const createBlogContent = async (req, res) => {
  let { blog: Blog, content, content_type } = req.body;
  if (!Blog || !content || !content_type) {
    return res.status(401).json({ error: 'All field Requires' });
  }
  Blog = await blog.findById(Blog);
  if (!Blog) {
    return res.status(401).json({ error: 'Invalid Blog Id' });
  }
  let Blogcontent = blogContent(req.body);
  Blogcontent = await Blogcontent.save();

  Blog.content.push(Blogcontent);
  await Blog.save();
  return res
    .status(201)
    .json({ status: 'BlogContent create successfully', Blogcontent });
};
const updateBlogContent = async (req, res) => {
  const { content } = req.body;
  const { _id: content_id } = req.query;
  if (!content) {
    res.status(404).json({ error: 'required updated content' });
  }
  let BlogContent = await blogContent.findById(content_id);
  if (!BlogContent) {
    res.status(404).json({ error: 'Invalid BlogContent Id' });
  }
  // one way to update content
  BlogContent.content = content;
  await BlogContent.save();
  // another way to update content
  // await blogContent.findByIdAndUpdate(content_id, { content });
  return res.status(201).json({ status: 'BlogContent update successfully' });
};
const deleteBlogContent = async (req, res) => {
  return res.status(200).json({ status: 'BlogContent delete successfully' });
};

module.exports = {
  getBlogContent,
  createBlogContent,
  updateBlogContent,
  deleteBlogContent,
};
