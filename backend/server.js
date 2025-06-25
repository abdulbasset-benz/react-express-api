import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { sql } from "./config/db.js"; // Importing the database configuration

import productRoutes from "./routes/productRoutes.js"; // Importing product routes

dotenv.config(); // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(helmet()); // Security middleware that helps secure Express apps by setting various HTTP headers
app.use(morgan("dev")); // HTTP request logger middleware for Node.js, logging in 'dev' format
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        image VARCHAR(255) NOT NULL, 
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (error) {
    console.log("Error initializing database:", error);
  }
}

app.use("/api/products", productRoutes); // Mounting product routes under /api/products
app.get("/api", (req, res) => {
  res.send("Welcome to the API website");
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
