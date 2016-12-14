"use strict";
require('dotenv').config();
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_NAME,
  api_key:  process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

var cloudinaryOptions = {
  "use_filename": false,
  "overwrite": true,
  "folder": "",
}

// List all files in a directory in Node.js recursively in a synchronous fashion
var walkSync = function(dir, filelist) {
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    }
    else {
      filelist.push({dir,file});
    }
  });
  return filelist;
};

var files  = walkSync("img/")
var filesLength = files.length;
var count = 0;

files.forEach( function(a){
  cloudinaryOptions.folder = a.dir;
  cloudinaryOptions.public_id = a.file;

  cloudinary.uploader.upload("./"+a.dir+a.file, function(result) {
    count++;
    console.log(filesLength+"/"+count+"\t"+a.dir+a.file)
    console.log(result);
    var fs =  require('fs');


    fs.writeFile("./jsons/"+a.file+".json", JSON.stringify(result), function(err) {
      if(err) {
        return console.log(err);
      }

    });
  }, cloudinaryOptions);
})
