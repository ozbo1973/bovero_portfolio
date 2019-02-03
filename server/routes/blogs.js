//blogs routes
const express = require("express");
const auth = require("../services/auth");
const BlogCtrl = require("../controllers/blogs");

const router = express.Router();

router.get("/", BlogCtrl.getBlogs);

router.post(
  "/",
  auth.checkJWT,
  auth.checkRole("siteOwner"),
  BlogCtrl.createBlog
);

router.get(
  "/me",
  auth.checkJWT,
  auth.checkRole("siteOwner"),
  BlogCtrl.getUserBlogs
);

router.get("/:id", BlogCtrl.readBlog);

router.get("/s/:slug", BlogCtrl.getBlogBySlug);

router.patch(
  "/:id",
  auth.checkJWT,
  auth.checkRole("siteOwner"),
  BlogCtrl.updateBlog
);

router.delete(
  "/:id",
  auth.checkJWT,
  auth.checkRole("siteOwner"),
  BlogCtrl.deleteBlog
);

module.exports = router;
