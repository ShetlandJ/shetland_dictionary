import express, { Request, Response } from 'express';
const app = express();
const { connectToServer, getDb } = require('./db.ts');
const cors = require("cors");
app.use(cors());

app.get("/find", async function (req: Request, res: Response) {
  const projection = {
    _id: 0,
    word: 1,
    example_sentence: 1,
    translation: 1,
    type: 1,
    see_also: 1,
  };

  const regex = { $regex: `^${req.query.searchString}` };

  const searchOr = {
    $or: [
      { word: regex },
      { example_sentence: regex },
      { translation: regex },
      { see_also: regex },
    ],
  }

  getDb()
    .collection("words")
    .find(searchOr)
    .project(projection)
    .toArray(function (err: any, result: Array<any>) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        const payload = result
        .map(word => ({
          ...word,
          see_also: word.see_also.split(',')
        }))

        res.json(payload);
      }
    });
});


const PORT = 8081;
app.listen(PORT, async function () {
  await connectToServer(() => console.log("Successfully connected"));
  console.log("Server listening on Port", PORT);
});