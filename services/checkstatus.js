var express = require("express");
var router = express.Router();
var r = require("rethinkdbdash")();
var Infobip = require('infobip-sms');

etInterval(function(){
  console.log('test');
}, 60 * 60 * 1000); 