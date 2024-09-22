import { createObjectCsvWriter } from "csv-writer";
import Artist from "../interfaces/Artist";
//a function that creates a csv file depending on the parametres
export const writeCSV = async (
  fileName: string,
  data: Artist[]
): Promise<void> => {
  //creation of the csv-writer main object with the file's columns and it's name
  const csvWriter = createObjectCsvWriter({
    path: `${fileName}.csv`,
    header: [
      { id: "name", title: "Name" },
      {
        id: "mbid",
        title: "Mbid",
      },
      {
        id: "url",
        title: "Url",
      },
      {
        id: "image_small",
        title: "Image Small",
      },
      {
        id: "image",
        title: "Image",
      },
    ],
  });
  //creating the actual file
  await csvWriter.writeRecords(data);
};
