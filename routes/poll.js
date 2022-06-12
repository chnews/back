const express = require('express');
const { pollcreate, pollread, pollAdd, getPoll } = require('../controllers/pollController');
const router = express.Router();




router.post("/poll", pollcreate);
router.get("/poll", pollread);

router.post("/poll-add", pollAdd);
router.get("/poll-get", getPoll);


module.exports = router;