'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const blogPost = require("./models/blogPost");

const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/demo', {useNewUrlParser: true});

app.use(bodyParser.json({ limit: 100000 }));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/user', function (req, res) {
   console.log("Got a GET request for the homepage");
   
   blogPost.find({ "body" : "body titless 123"})
   .then((data)=>{
   	res.json(data);
   })
   .catch((err)=>{
   	res.send("error "+ err);
   })
 
})

app.get('/user/:id', function (req, res) {
   console.log("Got a GET request for the homepage");
   
   console.log(req.query)
   console.log(req.params)
   console.log(req.path)

   res.json({first_name : "Que1", last_name: "Bee", age: 12});
})

// This responds a POST request for the homepage
app.post('/user', function (req, res) {
   console.log("Got a POST request for the homepage");
   let query = {
      first_name: req.body.first_name,
      last_name: req.body.last_name
   };
	
	let blogData = new blogPost({
		title: "title name 123",
		body: "body titless 123",
		date: Date.now()
	})

   blogData.save()
   .then((data)=>{
   	res.json(data);
   })
   .catch((err)=>{
   	res.send("error "+ err);
   })
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

const server = app.listen(8081, function () {
   const host = server.address().address
   const port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});