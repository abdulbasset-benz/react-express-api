import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router(); // Route to get all products

router.get("/", getProducts); // Route to get a product by ID
router.get("/:id", getProductById); // Route to create a new product
router.post("/", createProduct); // Route to update a product by ID
router.put("/:id", updateProduct); // Route to delete a product by ID
router.delete("/:id", deleteProduct); // Export the router to be used in the main server file

export default router;
