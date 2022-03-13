const express = require('express');
const app = express();
const { connectToServer, getDb } = require('./db.ts');
const cors = require("cors");
app.use(cors());

app.get("/find", async function (req, res) {
  const projection = {
    _id: 0,
    word: 1,
    example_sentence: 1,
    translation: 1,
  };

  console.log("SEARCH STRING", req.query.searchString);

  const searchOr = {
    $or: [
      { word: { $regex: `^${req.query.searchString}` } },
      { example_sentence: { $regex: `^${req.query.searchString}` } },
      { translation: { $regex: `^${req.query.searchString}` } },
    ],
  }

  getDb()
    .collection("words")
    .find(searchOr)
    // .find({ word: { $regex: `^${req.query.searchString}` } })
    .project(projection)
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!", err);
      } else {
        console.log(result);
        res.json(result);
      }
    });
});


const PORT = 8081;
app.listen(PORT, async function (err) {

  if (err) console.log("Error in server setup")
  await connectToServer(() => console.log("Successfully connected"));
  console.log("Server listening on Port", PORT);
})
