const mongoose = require('mongoose');

const blogCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    total_blogs: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: 'blog_category',
  }
);

const blogSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blogCategory',
      required: true,
    },
    title: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    url: {
      type: String,
      trim: true,
      unique: true,
      require: true,
    },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'blogContent' }],
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: 'blog',
  }
);

const blogContentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blog',
      required: true,
      // unique: true,
    },

    content_type: {
      type: String,
      enum: ['text', 'image', 'code'],
    },
    content: String,
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: 'blog_content',
  }
);
const blogCategory = mongoose.model('blogCategory', blogCategorySchema);
const blog = mongoose.model('blog', blogSchema);
const blogContent = mongoose.model('blogContent', blogContentSchema);

module.exports = { blogCategory, blog, blogContent };
