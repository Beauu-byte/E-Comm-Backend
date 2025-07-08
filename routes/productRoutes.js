const express = require("express");
const router = express.Router();
const { createProduct, getProducts } = require("../controllers/productController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/", auth, admin, createProduct);   //auth is a middleware that checks if the user is authenticated
router.get("/", getProducts);

module.exports = router;