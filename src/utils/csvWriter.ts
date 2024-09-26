import { createObjectCsvWriter } from "csv-writer";
import Artist from "../interfaces/Artist";
import { createWriteStream } from "fs";
import { format } from "fast-csv";
import { resolve } from "path";
import { rejects } from "assert";
//a function that creates a csv file depending on the parametres
export const writeCSV = async (
  fileName: string,
  data: Artist[]
): Promise<void> => {
  //setting the headers for the csv file
  const csvStream = format({
    headers: ["name", "mbid", "url", "image_small", "image"],
  });
  //setting the name of teh fiel
  const writableStream = createWriteStream(`csv/${fileName}.csv`);
  //when the writing is done the promise is resolved
  writableStream.on("finish", resolve);
  //and here the promise is rejected on error
  writableStream.on("error", rejects);
  // pipe the CSV stream to the writable stream (file)
  csvStream.pipe(writableStream);
  // Write each artist's data to the CSV
  data.forEach((artist) => {
    csvStream.write({
      name: artist.name || "",
      mbid: artist.mbid || "",
      url: artist.url || "",
      image_small: artist.image_small || "",
      image: artist.image || "",
    });
  });
  //ending the stream
  csvStream.end();
};
