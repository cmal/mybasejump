'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
//var passport = require('passport');
//var session = require('express-session');

var app = express();
require('dotenv').load();

var months=["January","Feburary","March","April",
			"May","June","July","August",
			"September","October","November",
			"December"];
app.put('/:date', function(req, res){
	var json;
	var unix;
	var natural;
	 if (req.params.date.search(/[a-z]/) !== -1) {
	 	natural = decodeURIComponent(req.params.date);
	 	var arr = natural.split(" ");
	 	var myDate = new Date();
	 	var year=parseInt(arr[2]);
	 	var monthx=months.indexOf(arr[0]);
	 	var day=parseInt(arr[1].slice(0,-1));
	 	myDate.setFullYear(year, monthx, day);
	 	unix = Number(myDate).toString();
		json = {
			"unix": unix,
			"natural": natural
		};
	} else if (req.params.date.search(/^\d+$/) !== -1) {
		unix = parseInt(req.params.date);
		var myDate = new Date(unix);
		natural = months[myDate.getMonth()] + " " + myDate.getDate() + ", " + myDate.getFullYear();
		json = {
			"unix": unix,
			"natural": natural
		};
	} else {
		json = {
			"error": 1,
		};
	}
	res.send(JSON.stringify(json));
})



var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});