import vision from "@google-cloud/vision";
import dotenv from "dotenv";
dotenv.config();

const client = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }
});

const storageURL = process.env.STORAGE_URL;
const bucketURL = "images";

export const analyze = async (img, callback, external = false) => {
  console.log("detecting image: ", img);

  try {
    const url = external ? img : `${storageURL}/${bucketURL}/${img}`;
    const [result] = await client.documentTextDetection(url);
    return callback(result.fullTextAnnotation.text);
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};
