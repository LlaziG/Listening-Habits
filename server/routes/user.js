const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { getName } = require('country-list');

const { asyncEH } = require('../middleware/index');


router.get('/authorize', asyncEH(async (req, res) => {
    const scopes = 'user-read-private user-read-email user-top-read';
    const client_id = 'a1930b0b80cc46b687e3aee3f8593b84';
    const redirect_uri = 'http://localhost:3005/dashboard/';

    res.redirect(`https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`);

}));

router.get('/profile', asyncEH(async (req, res) => {
    fetch('	https://api.spotify.com/v1/me', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${req.headers.spotify_auth}`
        },
    })
        .then(data => data.json())
        .then(json => {
            if (json.display_name) res.send({
                name: json.display_name,
                image: json.images[0].url,
                type: json.product,
                code: json.country,
                country: getName(json.country)
            })
            else { res.send({ error: "token_expired" }) }
        });
}));

router.get('/artists/:time_range', asyncEH(async (req, res) => {
    fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${req.params.time_range}`, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${req.headers.spotify_auth}`
        },
    })
        .then(data => data.json())
        .then(json => {
            let artists = new Array();
            json.items.forEach(el => {
                artists.push({
                    url: el.external_urls.spotify,
                    genre: el.genres.slice(0, 2).join(", "),
                    genres: el.genres,
                    image: el.images[0],
                    name: el.name,
                    popularity:
                        el.popularity < 50
                            ? 1
                            : Math.floor((el.popularity - 50) / 50) - Math.floor((el.popularity / 100)) + 1 + Math.round((el.popularity - 51) / 10)
                    // Gives 1-5 rating: 0- 50; 51- 65; 66- 75; 76- 85; 86- 100
                });
            });
            res.send({ artists: artists })
        });
}));

router.get('/tracks/:time_range', asyncEH(async (req, res) => {
    fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${req.params.time_range}`, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${req.headers.spotify_auth}`
        },
    })
        .then(data => data.json())
        .then(json => {
            let tracks = new Array();
            json.forEach(el => {
                tracks.push({
                    id: el.id,
                    url: el.external_urls.spotify,
                    genre: el.genres.slice(0, 2).join(", "),
                    genres: el.genres,
                    image: el.album.images[0],
                    artist: el.artists[0].name,
                    album: el.album.name.toLowerCase(),
                    name: el.name,
                    popularity:
                        el.popularity < 50
                            ? 1
                            : Math.floor((el.popularity - 50) / 50) - Math.floor((el.popularity / 100)) + 2 + Math.round((el.popularity - 51) / 10)
                    // Gives 1-5 rating: 0- 50; 51- 65; 66- 75; 76- 85; 86- 100
                });
            });
            res.send({ artists: artists })
        });
}));

module.exports = router;