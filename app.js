const express = require("express");
const path = require("path");
const {returnArtists} = require("./dataProvider");
const {returnArtistsByCountry} = require("./dataProvider");
const {returnGalleries} = require("./dataProvider");
const {returnGalleriesByCountry} = require("./dataProvider");
const {returnPaintings} = require("./dataProvider");
const {returnPaintingById} = require("./dataProvider");
const {returnPaintingsByGalleryId} = require("./dataProvider");
const {returnPaintingsByArtistId} = require("./dataProvider");
const {returnPaintingByText} = require("./dataProvider");
const {returnPaintingsByYear} = require("./dataProvider");
const {returnPaintingByColor} = require("./dataProvider");

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

    if (artists.length == 0) {
        return res.status(404).json({ message: 'Paintings not found' });
    }

    res.json(artists);
})

app.get("/api/galleries", (req, res) => {
    const galleries = returnGalleries();
    res.json(galleries);
})

app.get("/api/galleries/:country", (req, res) => {
    const country = req.params.country;
    const galleries = returnGalleriesByCountry(country);

    if (galleries.length == 0) {
        return res.status(404).json({ message: 'Paintings not found' });
    }

    res.json(galleries);
})

app.get("/api/paintings", (req, res) => {
    const paintings = returnPaintings();
    res.json(paintings);
})

app.get("/api/painting/:id", (req, res) => {
    const id = req.params.id;
    const paintings = returnPaintingById(id);

    if (paintings.length == 0) {
        return res.status(404).json({ message: 'Paintings not found' });
    }

    res.json(paintings);
})

app.get("/api/painting/gallery/:id", (req, res) => {
    const id = req.params.id;
    const paintings = returnPaintingsByGalleryId(id);

    if (paintings == 0) {
        return res.status(404).json({ message: 'Paintings not found' });
    }

    res.json(paintings);
})

app.get("/api/painting/artist/:id", (req, res) => {
    const id = req.params.id;
    const paintings = returnPaintingsByArtistId(id);

    if (paintings == 0) {
        return res.status(404).json({ message: 'Paintings not found' });
    }

    res.json(paintings);
})

app.get("/api/painting/year/:min/:max", (req, res) => {
    const min = req.params.min;
    const max = req.params.max;
    const paintings = returnPaintingsByYear(min, max);

    if (paintings == 0) {
        return res.status(404).json({ message: 'Paintings not found' });
    }

    res.json(paintings);
})

app.get("/api/painting/title/:text", (req, res) => {
    const text = req.params.text;
    const paintings = returnPaintingByText(text);

    if (paintings == 0) {
        return res.status(404).json({ message: 'Paintings not found' });
    }

    res.json(paintings);
})

app.get("/api/painting/color/:name", (req, res) => {
    const name = decodeURIComponent(req.params.name);
    const paintings = returnPaintingByColor(name);

    if (paintings == 0) {
        return res.status(404).json({ message: 'Paintings not found' });
    }

    res.json(paintings);
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})