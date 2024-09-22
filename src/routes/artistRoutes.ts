import express from "express";
import { searchArtistByName } from "../controllers/artistController";
//create router
const router = express.Router();
//set the get endpoint
router.get("/search", searchArtistByName);

export default router;
