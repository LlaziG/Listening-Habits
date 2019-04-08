const express = require('express');
const router = express.Router();

const { asyncEH } = require('../middleware/index');


router.get('/', asyncEH(async (req, res) => {
    const scopes = 'user-read-private user-read-email';
    const client_id = 'a1930b0b80cc46b687e3aee3f8593b84';
    const redirect_uri = 'http://localhost:3000/dashboard';

    res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`);

}));

module.exports = router;