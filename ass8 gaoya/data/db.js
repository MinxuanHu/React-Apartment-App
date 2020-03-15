'use strict'

var db = require('monk')('mongodb://localhost:27017/paywork');
var User = db.get('users')
var Repair = db.get('repairs')
var Pay = db.get('pays')

module.exports = {
    User,
    Repair,
    Pay,
}