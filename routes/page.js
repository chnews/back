const express = require('express');
const router = express.Router();

const { requireSignin, adminMiddleware, authMiddleware, canUpdateDeleteBlog } = require('../controllers/auth');
const {
    createAbout, 
    createAdvertise,
    createContact,
    createEditor,
    getAbout,
    getAds,
    getEditor,
    getContact
   
} = require('../controllers/page');

const {createPage, getPage} = require('../controllers/pagesController');




router.post('/add-about', requireSignin, adminMiddleware, createAbout);
router.post('/add-contact', requireSignin, adminMiddleware, createContact);
router.post('/add-editor', createEditor);
router.post('/add-ads', requireSignin, adminMiddleware, createAdvertise);



router.get('/get-about', getAbout);
router.get('/get-ads', getAds);
router.get('/get-editor', getEditor);
router.get('/get-contact', getContact);

router.post('/add-page', requireSignin, adminMiddleware, createPage);
router.get('/get-page', getPage);




module.exports = router;