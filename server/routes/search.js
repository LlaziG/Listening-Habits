const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const { asyncEH } = require('../middleware/index');


router.get('/playlists/:limit/:query', asyncEH(async (req, res) => {
    fetch(`https://api.spotify.com/v1/search?q=${req.params.query}&limit=${Number(req.params.limit) || 10}&type=playlist`, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${req.headers.spotify_auth}`
        },
    })
        .then(data => data.json())
        .then(json => {
            let playlists = new Array();
            json.playlists.items.forEach(el => {
                playlists.push(el.id);
            });
            res.send({ playlists: playlists });
        });
}));

module.exports = router;