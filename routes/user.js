const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware } = require('../controllers/auth');
const { create, read, publicProfile, update, photo, users} = require('../controllers/user');

router.get('/user/create', requireSignin, authMiddleware, create);
router.get('/user/profile', requireSignin, authMiddleware, read);
router.get('/user/:username', publicProfile);
router.put('/user/update', requireSignin, authMiddleware, update);
router.get('/users', users);
router.get('/user/photo/:username', photo);

module.exports = router;