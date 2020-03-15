var express = require('express');
var { User, Pay } = require('./../data/db.js');
var router = express.Router();
const uuidV1 = require('uuid/v1');

/* GET home page. */
router.get('/', function(req, res, next) {
    // var data = []
    // if (users) {
    //     for (let i = 0; i < 12; i++) {
    //         data.push({
    //             payid: uuidV1(),
    //             num: 300,
    //             month: i + 1,
    //             userid: 123456,
    //         })
    //     }
    // }
    // return res.send({ code: '200', msg: "Hello World!", data: data });
    return res.send({ code: '200', msg: "Hello World!" });
});


router.get('/getAll', function(req, res, next) {
    let ids = req.query.id;
    User.find(ids ? { _id: ids } : {}, function(err, users) {
        return res.send({ code: '200', msg: "ok", data: users, });
    });
});


router.delete('/delete', function(req, res, next) {
    let ids = req.body.id;
    User.remove({ _id: ids }, function(err, users) {
        return res.send({ code: '200', msg: "ok", });
    });
});

router.post('/login', function(req, res, next) {
    User.find({ email: req.body.email }, function(err, users) {
        if (!users.length) {
            return res.send({ code: 500, msg: "User is not  existence" })
        }
        if (users[0].password !== req.body.password) {
            return res.send({ code: 500, msg: "password error!" })
        }
        return res.send({ code: 200, msg: "ok", data: users[0] })
    });
});


router.post('/edit', function(req, res, next) {
    var id = req.body.id;
    var body = req.body;
    delete body.id;
    console.log("body -->", body);
    User.findOneAndUpdate({ _id: id }, { $set: body }, function(err, users) {
        res.send({ code: 200, msg: "ok" })
    });
});

router.post('/create', function(req, res, next) {
    var obj = {
        email: req.body.email,
        password: req.body.password,
    }

    var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    var enoughRegex = new RegExp("(?=.{8,}).*", "g");

    console.log("obj -->", obj);

    if (!obj.email || !reg.test(obj.email)) {
        return res.send({ code: '500', msg: "Please enter a valid email address" })
    }
    // if (!obj.password || !enoughRegex.test(obj.password)) {
    //     return res.send({ code: '500', msg: "密码不能小于八位" })
    // }

    User.find({ email: req.body.email }, function(err, users) {
        if (users.length) {
            return res.send({ code: '500', msg: "User\'\s  existence" })
        }
        User.insert(obj, function(err, users) {
            console.log("users -->", users);
            if (users) {
                for (let i = 0; i < 12; i++) {
                    Pay.insert({
                        payid: uuidV1(),
                        price: 3,
                        month: i + 1,
                        userid: users._id,
                    })
                }
            }

            setTimeout(() => {
                err ? res.json(500, { code: 500, msg: "Create errors" }) : res.json(200, { code: 200, msg: "created success" });
            },1000)
        });
    });
});













module.exports = router;