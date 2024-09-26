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
  return new Promise((resolve, reject) => {
    // Setting the headers for the CSV file
    const csvStream = format({
      headers: ["name", "mbid", "url", "image_small", "image"],
    });

    // Setting the path of the file to be created
    const writableStream = createWriteStream(`csv/${fileName}.csv`);

    // When the writing is done, the promise is resolved
    writableStream.on("finish", () => resolve());

    // And here the promise is rejected on error
    writableStream.on("error", (error) => reject(error));

    // Pipe the CSV stream to the writable stream (file)
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

    // Ending the stream
    csvStream.end();
  });
};
