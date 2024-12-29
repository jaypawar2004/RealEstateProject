const multer = require('multer');
const path = require('path');
const crypto = require('crypto');



//disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/uploads"); // Directory to save images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with extension
  },
});
  
  
  
  // const upload = multer({ storage: storage });

  // Multer middleware
const upload = multer({
  storage:storage});

  module.exports = upload