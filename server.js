const express = require("express");
const path = require("path");
const notes = require("./routes/notes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", notes);

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
  

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});


app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
