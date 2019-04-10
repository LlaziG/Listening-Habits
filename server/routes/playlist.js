const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const { asyncEH } = require('../middleware/index');


router.get('/:id/tracks/', asyncEH(async (req, res) => {
    fetch(`https://api.spotify.com/v1/playlists/${req.params.id}/tracks`, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${req.body.token}`
        },
    })
        .then(data => data.json())
        .then(json => {
            let tracks = new Array();
            json.items.forEach(el => {
                tracks.push(el.track.id);
            });
            res.send({ tracks: tracks });
        });
}));

module.exports = router;