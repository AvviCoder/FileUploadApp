
const express = require("express");
const router = express.Router();

// importing the controller
const {localFileUpload, imageUploader, videoUploader, reduceImgUploader} = require("../controllers/fileUpload");

// defining the API routes
router.post("/videoUpload", videoUploader);
router.post("/localfileupload", localFileUpload);
router.post("/imageUpload", imageUploader);
router.post("/reduceImgUpload", reduceImgUploader);
module.exports = router;