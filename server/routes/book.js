const express = require("express");
const BookCtrl = require("../controllers/book");

const router = express.Router();

router.get("/", BookCtrl.getBooks);

router.post("/", BookCtrl.createBook);

router.get("/:id", BookCtrl.getBook);

router.patch("/:id", BookCtrl.updateBook);

router.delete("/:id", BookCtrl.deleteBook);

module.exports = router;
