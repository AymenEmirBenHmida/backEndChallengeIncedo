import express, { Application } from "express";
import dotenv from "dotenv";
import artistRoutes from "./routes/artistRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/artist", artistRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
