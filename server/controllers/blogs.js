const Blog = require("../models/blogs");
const AsyncLock = require("async-lock");
const slugify = require("slugify");

const lock = new AsyncLock();

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "published" }).sort({
      updatedAt: -1
    });
    return res.json(blogs);
  } catch (error) {
    return res.status(422).send(error);
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blogs = await Blog.findOne({ slug: req.params.slug });
    return res.json(blogs);
  } catch (error) {
    return res.status(422).send(error);
  }
};

exports.createBlog = async (req, res) => {
  const lockKey = req.user.sub;
  if (lock.isBusy(lockKey)) {
    return res.status(422).send({ message: "Currently Saving Blog." });
  } else {
    lock.acquire(
      lockKey,
      async done => {
        try {
          const blog = await new Blog(req.body);
          if (req.user) {
            blog.userId = req.user.sub;
            blog.author = req.user.name;
          }

          const savedBlog = await blog.save();
          setTimeout(() => done(), 5000);
          return res.json(savedBlog);
        } catch (error) {
          return res.status(422).send(error);
        }
      },
      (err, ret) => {
        err && console.error(err);
      }
    );
  }
};

exports.readBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    return res.json(blog);
  } catch (error) {
    return res.status(422).send(error);
  }
};

exports.updateBlog = async (req, res) => {
  const updatedAt = new Date();
  const body = { ...req.body, updatedAt };
  if (req.body.status && req.body.status === "published") {
    try {
      const foundBlog = await Blog.findOne({ _id: req.params.id });
      if (!foundBlog.slug) {
        body.slug = slugify(foundBlog.title, { lower: true });
      }
    } catch (error) {
      return res.status(422).send(error);
    }
  }

  try {
    const blog = await Blog.findOneAndUpdate({ _id: req.params.id }, body, {
      new: true
    });

    return res.json(blog);
  } catch (error) {
    return res.status(422).send(error);
  }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findOneAndDelete({ _id: id });
    return res.json(blog);
  } catch (error) {
    return res.status(422).send(error);
  }
};

exports.getUserBlogs = async (req, res) => {
  const userId = req.user.sub;
  try {
    const blogs = await Blog.find({ userId }).sort("-updatedAt");
    return res.json(blogs);
  } catch (error) {
    return res.status(422).send(error);
  }
};
