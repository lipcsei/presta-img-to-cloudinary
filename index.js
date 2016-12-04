"use strict";
require('dotenv').config();
const cloudinary = require('cloudinary');
const mysql      = require('mysql');


var db = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});

cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_NAME,
  api_key:  process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
