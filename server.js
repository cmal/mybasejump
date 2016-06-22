//'use strict';

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
app.get('/:date', function(req, res){
	var json;
	var unix;
	var natural;
	if (req.params.date.search(/[a-z]/) !== -1) {
		try {
	 		natural = decodeURIComponent(req.params.date);
		 	var arr = natural.split(" ");
		 	var year=parseInt(arr[2]);
	 		var monthx=months.indexOf(arr[0]);
		 	var day=parseInt(arr[1].slice(0,-1));
	 		var myDate = new Date(Date.UTC(year, monthx, day));
		 	unix = parseInt(Number(myDate)/1000);
		} catch(err) {
			unix = "null";
			natural = "null";
		}
	} else if (req.params.date.search(/^\d+$/) !== -1) {
		unix = parseInt(req.params.date);
		var myDate = new Date(unix*1000);
		natural = months[myDate.getMonth()] + " " + myDate.getDate().toString() + ", " + myDate.getFullYear().toString();
	} else {
		unix = "null";
		natural = "null";
	}
	json = {
		"unix": unix,
		"natural": natural
	};
	res.send(JSON.stringify(json));
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});