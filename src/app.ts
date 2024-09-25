import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import artistRoutes from "./routes/artistRoutes";
//integrating the .env file into the project
dotenv.config();
const app: Application = express();
// CORS options
const corsOptions = {
  origin: "http://localhost:3001", // Replace with your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // If you need to send cookies or credentials
};
//setting up the port to be exposed
const PORT = process.env.PORT || 3000;
//middleware
app.use(express.json());
// Use CORS middleware
app.use(cors(corsOptions));
//the endpoint to getting the artists
app.use("/api/artist", artistRoutes);
//making the app listen to the chosen port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
