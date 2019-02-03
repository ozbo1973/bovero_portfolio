const mongoose = require("mongoose");

const stringRequired = { type: String, required: true };
const dateFields = { type: Date, default: Date.now };

const blogSchema = new mongoose.Schema({
  userId: stringRequired,
  slug: { type: String, unique: true, sparse: true },
  title: { ...stringRequired, maxlength: 96 },
  subTitle: stringRequired,
  story: stringRequired,
  createdAt: dateFields,
  updatedAt: dateFields,
  status: { type: String, default: "draft" },
  author: stringRequired
});

module.exports = mongoose.model("Blog", blogSchema);
