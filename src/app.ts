import express from "express";
import identifyRoutes from "./routes";
import { Sequelize } from "sequelize";
import Contact from "./models/contact";

const app = express();
app.use(express.json());

// Create Sequelize instance and connect to the database
export const sequelize = new Sequelize("<db_name>", "your_db_user", "your_db_password", {
  host: "localhost",
  dialect: "postgres",
  port: 5432, // Change this to your database port if necessary
});

// Import and initialize the Contact model
import "./models/contact"; // This line imports the Contact model and initializes it with the Sequelize instance

// Synchronize models with the database (create the table if it doesn't exist)
sequelize.sync({ alter: true });

// Register routes
app.use(identifyRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
