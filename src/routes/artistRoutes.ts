import express from "express";
import {
  downloadArtistsFile,
  searchArtistByName,
} from "../controllers/artistController";
//create router
const router = express.Router();
//set the get endpoint for getting the artists
router.get("/search", searchArtistByName);
//set the get endpoint for downloading the artists file
router.get("/download", downloadArtistsFile);

export default router;
