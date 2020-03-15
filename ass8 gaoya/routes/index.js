var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    return res.send({ code: '200', msg: "Hello Express" });
});

module.exports = router;