const express = require('express');
const router = express.Router();
const { create, list, read, remove, allCat } = require('../controllers/ecategory');

// validators
const { runValidation } = require('../validators');
const { categoryCreateValidator } = require('../validators/category');
const { requireSignin, adminMiddleware } = require('../controllers/auth');

router.post('/ecategory', categoryCreateValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/ecategories', list);
router.get('/eallcat', allCat);
router.get('/ecategory/:slug', read);
router.delete('/ecategory/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;