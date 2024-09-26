import { Request, Response } from "express";
import { searchArtist } from "../services/artistService";
import { writeCSV } from "../utils/csvWriter";
import randomArtists from "../data/randomArtists.json";
import Artist from "../interfaces/Artist";
import path from "path";
import fs from "fs";

//will handle the logic of finding the artists
export const searchArtistByName = async (req: Request, res: Response) => {
  const { name } = req.query as { name?: string };
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
    //return data
    return res.status(200).json({ message: "Success", data: artistList });
  } catch (error) {
    console.error(error);
    //returning error
    res.status(500).json({ error: "Error fetching artist data" });
  }
};
//will handle downloading the file
export const downloadArtistsFile = async (req: Request, res: Response) => {
  const { name, fileName } = req.query as { name: string; fileName: string };
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
    //generate csv based on the list given
    await writeCSV(fileName, artistList);
    // Resolve file path (adjust to where the CSV file is saved)
    const filePath = path.resolve(__dirname, `../../csv/${fileName}.csv`);
    console.log(__dirname, `../../csv/${fileName}.csv`);
    // verify that the file exists before attempting to download
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return res.status(404).send("File not found.");
    }
    res.download(filePath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Error downloading file.");
      }
    });
  } catch (error) {
    console.error(error);
    //returning error
    res.status(500).json({ error: "Error fetching artist data" });
  }
};
