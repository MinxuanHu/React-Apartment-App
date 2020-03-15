var express = require('express');
var { Repair } = require('./../data/db.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let ids = req.query.id;
    Repair.find(ids ? { _id: ids } : {}, function(err, users) {
        return res.send({ code: '200', msg: "ok", data: users, });
    });
});



router.post('/create', function(req, res, next) {

    var obj = {
        content: req.body.content,
        permission: req.body.permission,
        priority: req.body.priority,
        userid: req.body.userid,
        useremail: req.body.useremail,
    }

    console.log("obj -->", obj);

    if (!obj.content || !obj.permission || !obj.priority || !obj.userid) {
        return res.send({ code: '500', msg: "Parameter cannot be empty" })
    }

    Repair.insert(obj, function(err, users) {
        err ? res.json(500, { code: 500, msg: "Create errors" }) : res.json(200, { code: 200, msg: "created success" });
    });




});





module.exports = router;