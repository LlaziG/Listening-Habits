const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const { asyncEH } = require('../middleware/index');


router.get('/features/:ids', asyncEH(async (req, res) => {
    fetch(`https://api.spotify.com/v1/audio-features?ids=${req.params.ids}`, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${req.headers.spotify_auth}`
        },
    })
        .then(data => data.json())
        .then(json => {
            let features = new Array();
            json.audio_features.forEach(el => {
                features.push({
                    danceability: el.danceability,
                    energy: el.energy,
                    acousticness: el.acousticness,
                    valence: el.valence
                });
            });
            res.send({ features: features });
        });
}));

module.exports = router;