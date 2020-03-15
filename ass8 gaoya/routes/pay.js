var express = require('express');
var { User, Pay } = require('./../data/db.js');
var router = express.Router();
const uuidV1 = require('uuid/v1');
var ObjectID = require('mongodb').ObjectID;

var paypal = require('paypal-rest-sdk');


var client_id = 'ARVKu7PINbPEpliHxW1SmQKyRn5UwWTDk07VhBJY2ODkRYMKG6JjEpXOv5yFXrmvTj0rv1VXNH60NuCR';
var secret = 'EMlBP_cmdrPXO_8hrO57epMCAke2GVotVCFkNC1XBkJ7UzitdQCDTKIkuhMKVnpZpeA9JLeEOHkHMttg';


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': client_id,
    'client_secret': secret
});

/* GET home page. */
router.get('/', function(req, res, next) {
    return res.send({ code: '200', msg: "Hello World!" });
});


router.get('/get', function(req, res, next) {
    let userid = '' + req.query.userid;
    Pay.find({ userid: ObjectID(userid) }, function(err, users) {
        return res.send({ code: '200', msg: "ok", data: users, });
    });
});



router.get('/create', function(req, res) {

    var { total, payid, msg } = req.query;

    var obj = { total, payid, msg };

    //build PayPal payment request
    var payReq = JSON.stringify({
        'intent': 'sale',
        'redirect_urls': {
            'return_url': `http://localhost:3001/pay/process?payid=${obj.payid}`,
            'cancel_url': 'http://localhost:3001/pay/cancel'
        },
        'payer': {
            'payment_method': 'paypal'
        },
        'transactions': [{
            // 'business': "sb-kzn4y719359@business.example.com",
            'amount': {
                'total': obj.total,
                'currency': 'USD'
            },
            'description': obj.msg
        }]
    });

    paypal.payment.create(payReq, function(error, payment) {
        if (error) {
            console.log("error -->", error);
        } else {
            //capture HATEOAS links
            var links = {};
            payment.links.forEach(function(linkObj) {
                links[linkObj.rel] = {
                    'href': linkObj.href,
                    'method': linkObj.method
                };
            })

            //if redirect url present, redirect user
            if (links.hasOwnProperty('approval_url')) {
                res.redirect(links['approval_url'].href);
            } else {
                console.error('no redirect URI present');
            }

        }
    });
});



router.get('/process', async (req, res) => {
    var paymentId = req.query.paymentId;
    var payid = req.query.payid;
    var payids = payid.split(',').filter(item => item)
    var payerId = { 'payer_id': req.query.PayerID };

    paypal.payment.execute(paymentId, payerId, function(error, payment) {
        if (error) {
            console.log("error -->", error);
        } else {
            if (payment.state == 'approved') {
                payids.forEach(async (item) => {
                    console.log("item -->", item);
                    await Pay.remove({ payid: item })
                })
                setTimeout(() => {
                    res.json(200, { code: 200, msg: "pay success" });
                }, 4000)

            } else {
                res.json(500, { code: 500, msg: "pay errors" })

            }
        }
    });
});










module.exports = router;