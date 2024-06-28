const mongoose = require("mongoose");
require("dotenv").config();

 exports.dbconnect = () =>{
    mongoose.connect( process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
       // connectTimeoutMS: 30000,
      })
.then( console.log("DB connected successfully"))
.catch((error) =>{
        console.log("DB connection is unsuccessfull");
        console.error(error);
        process.exit(1);
    })
}

// REPLICATION OF THE ABOVE DATABASE CONNECTION CODE

// const mongoose = require("mongoose");
// require("dotenv").config();

// const dbconnector = () =>{
//    mongoose.connect(process.env.DB_URL, {
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//    })   .then(() =>{
//     console.log("The database connection is established successfully");
//    }).catch((error) =>{
//     console.log(error);
//     console.log("Unable to connect to the Database");
//     process.exit(1);
//    })
// }