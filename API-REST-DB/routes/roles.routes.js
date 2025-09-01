const express = require('express');
const router = express.Router();
const {
    getRoles
} = require('../controllers/roles.controller');

const verifyToken = require('../middlewares/verifyToken')
const isAdmin = require('../middlewares/isAdmin')

router.get('/', verifyToken, getRoles);


module.exports = router;
