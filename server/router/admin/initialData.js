const express = require('express');
const router = express.Router();
// const { requireSignin, adminMiddleware } = require('../../common-middleware');
// const { initialData } = require('../admin/initialData');
const {requireSignin} = require('../../common-middleware')
var {initialData} = require( "../../controller/admin/initialData" );


router.post('/initialdata', initialData)

module.exports = router;
