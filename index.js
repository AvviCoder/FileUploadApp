// // Corrected require statement to import express module
// const express = require("express");
// // Initializing express application
// const app = express();

// // Corrected require statement to import and configure dotenv module
// require("dotenv").config();
// // Corrected variable name to use uppercase convention for constants
// const PORT = process.env.PORT || 3000;

// // Corrected comment to remove incorrect information
// // Removed unnecessary middleware for JSON parsing since express-fileupload handles it
// const fileupload = require("express-fileupload");
// // Added middleware to parse incoming JSON requests
// app.use(express.json());
// // Added middleware for file upload functionality
// app.use(fileupload());

// // Corrected require statement to import and connect to database
// require("./config/database");
// // Corrected function call to properly initialize database connection


// // Corrected require statement to import cloudinary configuration
// const cloudinary = require("./config/cloudinary");
// // Removed incorrect function call, since cloudinary configuration typically doesn't require a function call
// cloudinary.cloudinaryConnect();

// // Corrected mounting path for API routes
// const upload = require("./routes/FileUpload");
// // Corrected mounting path to start with a forward slash ("/api/v1/upload") to avoid issues with route matching
// app.use("/api/v1/upload", upload);

// // Corrected syntax to listen to the specified port
// app.listen(PORT, () => {
//     console.log(`The app is running at port ${PORT}`);
// });


// express server instantiate
const express = require("express");
const app = express();

// process object loading
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// body parser express
app.use(express.json());

// express fileupload module used to upload the files
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/' // for file upload using a temporary file directory
})); // here this middleware is instantiated

// connection to the database
const db = require("./config/database");
db.dbconnect();

// setting up cloudinary to store and operate on stored files
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const upload = require("./routes/FileUpload");
app.use("/api/v1/upload", upload);

app.listen(PORT, () =>{
    console.log(`The app is running at PORT : ${PORT}`);
})

// // REPLICATION OF CODE 1
// const express = require("express");
// const app = express();

// require("dotenv").config();
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () =>{
//       console.log("The port is again running at the specified port");
// })

// app.use(express.json());

// const dbconnector = require("./config/database");
// dbconnector.dbconnect();

// const routes = require("./routes/FileUpload");
// app.use("/api/v1/upload", routes);

// const cloudinaryconnector = require("./config/cloudinary");
// cloudinaryconnector.cloudinaryConnect();

// const fileuploader = require("express-fileupload");
// app.use(fileuploader());
