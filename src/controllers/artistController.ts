import { Request, Response } from "express";
import { searchArtist } from "../services/artistService";
import { writeCSV } from "../utils/csvWriter";
import randomArtists from "../data/randomArtists.json";
import Artist from "../interfaces/Artist";
//will handle the logic of finding the artists
export const searchArtistByName = async (req: Request, res: Response) => {
  const { name, fileName } = req.query as { name?: string; fileName?: string };
  //when file name is not sent return error
  if (!fileName) {
    return res.status(400).json({ error: "Please provide a fileName" });
  }
  try {
    //initializing a list of artists
    let artistList: Artist[] = [];
    //search for artist by name
    if (name) artistList = await searchArtist(name);
    // when the no artists are returned or no name is given get artists based on a random name
    if (artistList.length === 0) {
      let index = Math.floor(Math.random() * randomArtists.length);
      const newArtistList = await searchArtist(randomArtists[index]);
      artistList.push(...newArtistList);
    }
    //beginning the writing of the csv file
    await writeCSV(fileName, artistList);
    //return data
    return res.status(200).json({ message: "Success", data: artistList });
  } catch (error) {
    console.error(error);
    //returning error
    res.status(500).json({ error: "Error fetching artist data" });
  }
};
