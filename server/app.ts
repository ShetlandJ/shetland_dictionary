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
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!", err);
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
app.listen(PORT, async function (err) {
  if (err) console.log("Error in server setup")
  await connectToServer(() => console.log("Successfully connected"));
  console.log("Server listening on Port", PORT);
})
