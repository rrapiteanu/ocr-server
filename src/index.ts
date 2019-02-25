import express from "express";
import cors from "cors";
import * as ocr from "./analyzer";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: "*"
  })
);

// testing: curl "http://localhost:4000/ocr?img=filename.png
app.get("/ocr", (req, res) => {
  var img = req.query.img;
  ocr.analyze(img, (result: any) => {
    res.json(result);
  });
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post("/ocr", (req, res) => {
  const imgUrl = req.body.url;

  console.log(imgUrl);

  ocr.analyze(
    imgUrl,
    (result: any) => {
      res.json(result);
    },
    true
  );
});

app.listen(port, () => {
  console.log(`server starting on localhost:${port}`);
});
