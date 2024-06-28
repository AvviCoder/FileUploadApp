const cloudinary = require("cloudinary").v2;
// v2 is to show the second version is currently under use

exports.cloudinaryConnect = () =>{
    try{
        cloudinary.config({ // three mandatory feilds are required...
            cloud_name:process.env.cloud_name,
            api_key:process.env.api_key,
            api_secret:process.env.api_secret,
        })
    }catch(error)
    {
          console.log(error);
    }
}

// REPLICATION OF ABOVE CODE

// const cloudinary = require("cloudinary").v2;

// exports.cloudConnect = () =>{
//          try{
//            cloudinary.config({
//             cloud_name: 
//             api_key: 
//             api_secert:

//            })
//          }
//          catch(error){
//             console.log(error);
//             message:"Unable to connect to cloudinary...."
//          }
// }