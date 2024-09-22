import { Request, Response } from "express";
import { searchArtist } from "../services/artistService";
// import { writeCSV } from "../utils/csvWriter";
// import randomArtists from "../data/randomArtists.json";
//will handle the logic of finding the artists
export const searchArtistByName = async (req: Request, res: Response) => {
  const { name, fileName } = req.query as { name?: string; fileName?: string };
  //when file name is not sent return error
  if (!fileName) {
    return res.status(400).json({ error: "Please provide a fileName" });
  }
  try {
    //search for artist by name
    const result = await searchArtist(name || "");
    return res.status(200).json({ message: "Success", data: result });
    // if (result.length === 0 && !name) {
    //   for (const randomArtist of randomArtists) {
    //     const retry = await searchArtist(randomArtist);
    //   }
    // } else {
    // }
  } catch (error) {
    res.status(500).json({ error: "Error fetching artist data" });
  }
};
