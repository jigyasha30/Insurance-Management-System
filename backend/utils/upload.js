const multer = require("multer");
const path = require("path");
const fs = require("fs");


// Create uploads folder automatically

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


// Storage Configuration

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, uploadDir);

  },


  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);


    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );

  }

});



// File Filter

const fileFilter = (req, file, cb) => {


  const allowedTypes =
    /jpg|jpeg|png|pdf|doc|docx/;


  const extName =
    allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );


  const mimeType =
    allowedTypes.test(
      file.mimetype
    );


  if(extName && mimeType){

    cb(null,true);

  }
  else{

    cb(
      new Error(
        "Only JPG, JPEG, PNG, PDF, DOC and DOCX files are allowed."
      )
    );

  }

};



// Upload Middleware

const upload = multer({

  storage,

  fileFilter,

  limits:{
    fileSize:5 * 1024 * 1024
  }

});


module.exports = upload;