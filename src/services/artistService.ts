import axios from "axios";
import Artist from "../interfaces/Artist";

//a get request to the third party api to get the list of artists
export const searchArtist = async (artistName: string): Promise<Artist[]> => {
  try {
    const apiKey = process.env.LASTFM_API_KEY;
    //making a get request to get the list of artists based on a name
    const response = await axios.get(`https://ws.audioscrobbler.com/2.0/`, {
      params: {
        method: "artist.search",
        artist: artistName,
        api_key: apiKey,
        format: "json",
      },
    });
    //mapping the result of the request into a variable to be further manipulated later on
    const artists: Artist[] = response.data.results.artistmatches.artist.map(
      (artist: any) => ({
        name: artist.name,
        mbid: artist.mbid || "",
        url: artist.url || "",
        image_small: artist.image?.[0]?.["#text"] || "",
        image: artist.image?.[1]?.["#text"] || "",
      })
    );
    return artists;
  } catch (error) {
    //throwing error in case of a problem
    console.error("Error searching for artist:", error);
    throw new Error("Failed to fetch artist data.");
  }
};
