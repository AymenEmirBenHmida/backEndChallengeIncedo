import express, { Application } from "express";
import dotenv from "dotenv";
import artistRoutes from "./routes/artistRoutes";
//integrating the .env file into the project
dotenv.config();

const app: Application = express();
//setting up the port to be exposed
const PORT = process.env.PORT || 3000;
//middleware
app.use(express.json());
//the endpoint to getting the artists
app.use("/api/artist", artistRoutes);
//making the app listen to the chosen port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
