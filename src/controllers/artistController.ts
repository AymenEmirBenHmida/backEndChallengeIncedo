import { Request, Response } from "express";
import { searchArtist } from "../services/artistService";
import { writeCSV } from "../utils/csvWriter";
import randomArtists from "../data/randomArtists.json";

export const searchArtistByName = async (req: Request, res: Response) => {
  const { name, fileName } = req.query as { name?: string; fileName?: string };
  if (!fileName) {
    return res.status(400).json({ error: "Please provide a fileName" });
  }
  try {
    const result = await searchArtist(name || "");
    if (result.length === 0 && !name) {
      for (const randomArtist of randomArtists) {
        const retry = await searchArtist(randomArtist);
      }
    }
  } catch (error) {}
};
