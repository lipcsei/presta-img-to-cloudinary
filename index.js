"use strict";
require('dotenv').config();
// const cloudinary = require('cloudinary');
// const mysql      = require('mysql');

//
// var db = mysql.createConnection({
//   host     : process.env.DB_HOST,
//   user     : process.env.DB_USER,
//   password : process.env.DB_PASSWORD,
//   database : process.env.DB_NAME
// });
//
// cloudinary.config({
//   cloud_name:  process.env.CLOUDINARY_NAME,
//   api_key:  process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


var walkSync = function(dir, filelist) {
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    }
    else {
      filelist.push(file);
    }
  });
  return filelist;
};
