const path = require("path");
const fs = require("fs");

const artistsPath = path.join(__dirname, "data", "artists.json");
const artistsData = fs.readFileSync(artistsPath);
const artists = JSON.parse(artistsData);

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function returnArtists() {
    return artists;
}

function returnArtistsByCountry(country) {
    const c = capitalizeFirstLetter(country);
    const found = artists.filter(a => a.Nationality == c);
    return found;
}

module.exports = {returnArtists, returnArtistsByCountry};