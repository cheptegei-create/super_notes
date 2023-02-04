const path = require("path");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");
const router = require("express").Router();

// Retrieving all notes
router.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);

  readFromFile("db/db.json").then((data) =>
    res.json(JSON.parse(data))
  );
});

// POST Route for submitting notes
router.post("/", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to submit notes`);

  // Declaring items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const addNewNote = {
      title,
      id: uuid(),
      text,
    };

    readAndAppend(addNewNote, "db/db.json");

    const response = {
      status: "success",
      body: addNewNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting feedback");
  }
});

// Retrieves a note with specific id
router.get("/:id", function (req, res) {
  // display json for the notes array indices of the provided id
  const noteId = req.params.id;
  readFromFile(path.join("db/db.json"))
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((point) => point.id == noteId);
      writeToFile("db/db.json", result);
      res.json("added note with id " + req.params.id);
    });
});

// Deletes a note with specific id
router.delete("/:id", function (req, res) {
  console.info(`${req.method} request received to delete notes`);
  const deletedId = req.params.id;
  readFromFile(path.join(__dirname, "../db/db.json"))
    .then((data) => JSON.parse(data))
    .then((notes) => {
      const newArray = notes.filter((note) => note.id != deletedId);
      writeToFile("db/db.json", newArray);
      res.json("Deleted note with id " + req.params.id);
    });
});

module.exports = router;
