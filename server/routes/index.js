const express = require('express');
const router = express.Router();
const fs = require('fs');

const jsonUrl = './db/db.json';

router.get('/api/json', (req, res) => {
    let rawData = fs.readFileSync(jsonUrl);
    let document = JSON.parse(rawData);
    res.json({
        data: document,
        success: true
    })
});

router.get('/search', (res, req) => {
    let searchQuery = req.sea
})

router.post('/api/json', (req, res) => {
    let rawData = fs.writeFileSync(jsonUrl, JSON.stringify(req.body));
    res.json({
        success: true
    })

});

module.exports = router;