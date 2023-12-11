const express = require("express");
const path = require("path");
const {returnArtists} = require("./dataProvider");
const {returnArtistsByCountry} = require("./dataProvider");

const app = express();
const port = 3000;

const testFolderPath = path.join(__dirname, "static");
app.use("/static", express.static(testFolderPath));

app.get("/", (req, res) => {
    res.sendFile(path.join(testFolderPath, "test.html"));
})

app.get("/api/artists", (req, res) => {
    const artists = returnArtists();
    res.json(artists);
})

app.get("/api/artists/:country", (req, res) => {
    const country = req.params.country;
    const artists = returnArtistsByCountry(country);
    res.json(artists);
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})