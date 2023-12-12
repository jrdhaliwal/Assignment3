const path = require("path");
const fs = require("fs");

// Path and data for artists.json
const artistsPath = path.join(__dirname, "data", "artists.json");
const artistsData = fs.readFileSync(artistsPath);
const artists = JSON.parse(artistsData);

// Path and data for galleries.json
const galleriesPath = path.join(__dirname, "data", "galleries.json");
const galleriesData = fs.readFileSync(galleriesPath);
const galleries = JSON.parse(galleriesData);

// Path and data for paintings-nested.json
const paintingsPath = path.join(__dirname, "data", "paintings-nested.json");
const paintingsData = fs.readFileSync(paintingsPath);
const paintings = JSON.parse(paintingsData);

// Function that ensures given word is case insensitive
function capitalizeFirstLetter(sentence) {
    if (sentence && typeof sentence === 'string') {
        return sentence
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
    return sentence; // Return unchanged if it's not a valid string
}


// Functions for artists.json
function returnArtists() {
    return artists;
}

function returnArtistsByCountry(country) {
    const c = capitalizeFirstLetter(country);
    const found = artists.filter(a => a.Nationality == c);
    return found;
}

// Functions for galleries.json
function returnGalleries() {
    return galleries;
}

function returnGalleriesByCountry(country) {
    const c = capitalizeFirstLetter(country);
    const found = galleries.filter(g => g.GalleryCountry == c);
    return found;
}

// Functions for paintings-nested.json
function returnPaintings() {
    return paintings;
}

function returnPaintingById(id) {
    const found = paintings.filter(p => p.paintingID == id);
    return found;
}

function returnPaintingsByGalleryId(id) {
    const found = paintings.filter(p => p.gallery.galleryID == id);
    return found;
}

function returnPaintingsByArtistId(id) {
    const found = paintings.filter(p => p.artist.artistID == id);
    return found;
}

function returnPaintingsByYear(min, max) {
    const found = paintings.filter(p => p.yearOfWork >= min && p.yearOfWork <= max);
    return found;
}

function returnPaintingByText(word) {
    const found = paintings.filter(p => {
        const wordLower = word.toLowerCase();
        const titleLower = p.title.toLowerCase();
        return titleLower.includes(wordLower);
    });

    return found;
}

function returnPaintingByColor(color) {
    const c = capitalizeFirstLetter(color);

    const found = paintings.filter(p => {
        for (let i = 0; i < p.details.annotation.dominantColors.length; i++) {
            if (p.details.annotation.dominantColors[i].name == c) {
                return p.details.annotation.dominantColors[i].name;
            }
        }
    });

    return found;
}


module.exports = {
    returnArtists, 
    returnArtistsByCountry, 
    returnGalleries, 
    returnGalleriesByCountry,
    returnPaintings,
    returnPaintingById,
    returnPaintingsByGalleryId,
    returnPaintingsByArtistId,
    returnPaintingByText,
    returnPaintingsByYear,
    returnPaintingByColor
};