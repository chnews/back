const express = require('express');
const router = express.Router();
const { create, list, read, remove, allCat } = require('../controllers/subcategory');

// validators
const { runValidation } = require('../validators');
const { categoryCreateValidator } = require('../validators/category');
const { requireSignin, adminMiddleware } = require('../controllers/auth');

router.post('/subcategory', create);
router.get('/subcategories', list);
router.get('/subcat', allCat);
router.get('/subcategory/:slug', read);
router.delete('/subcategory/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;