// imported the model for database interaction
const { UploadStream } = require("cloudinary");
const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

// localfile upload handler will be created here
 
exports.localFileUpload = async (req, res) =>{
     try{  // fetch the file for local uplaod
           const file = req.files.file;
           console.log(file);

        // defining the path to which the data is to be stored
        // __dir -> showing the current working directory   
        const path = __dirname +"/files/"+Date.now() + `.${file.name.split(".")[1]}`;

        // moving the file to the fixed path
        file.mv(path, (error) =>{
            console.log(error);
        });

        res.json({
            success:true,
            Message:"Local file uploaded Successfully"
        });
     }
     catch(error)
     {
        console.log(error);
     }
 }


//CODE REPLICATION IS INITIATED BELOW... 

// exports.localfileUploader = async(req,res) =>{
  
//   try{
//        // get the file
//        const file = req.files.file;
//        console.log(file);

//        //create path to save on local machine
//        const path = __dirname +"/store"+Date.now() + `.${file.name.split(".")[1]}`;

//        //moving the file on to the machine location
//        const response = file.mv(path, (error) =>{
//         console.log(error);
//        })

//        res.status(200).json({
//         success:true,
//         message:"Why cheete file upload krne k liye tayaar...."
//        });
         
//   }catch(error){
//         res.status(400).json({
//           success:true,
//           message:"error occured during uploading of the file..."
//         })
//   }

// }


// ----------------------------------------------------------------------------------------------

//IMAGE UPLOADER HANDLER
function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

//to upload the assests on cloudinary 
async function uploadFileToCloudinary(file,folder, quality)
{  // need to review this code again
    const options = {folder};
    options.resource_type ="auto";

    if(quality){
      options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUploader = async(req, res) =>{
    try{  
          // fetching data through request 
          const{name, tags, email} = req.body;
          console.log(name, tags, email);
        
          // extracting the file to be uploaded
          const file = req.files.ImgFile;
          console.log(file);

          //validation
          const supportedTypes = ["jpg", "jpeg", "png", "svg"];
          const fileType = file.name.split(".")[1].toLowerCase();
          console.log("file Type ->", fileType);


          if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
          }

          // if file format is supported
          console.log("NOW LETS UPLOAD THE FILE ON OUR CLOUD")
         const response = await uploadFileToCloudinary(file, "AvviFolder1");
         console.log(response);
         // db Entery saving

         console.log("CREATING A DATABASE ENTRY FOR THE UPLOADED FILE")

         const fileData = await File.create({
            name,
            tags,
            email,
            imgUrl:response.secure_url,
         })
          
         console.log(fileData); 

         res.json({
            success:true,
            imgUrl:response.secure_url,
            message:"The file is uploaded successfully",
         })

          
    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        });
    }
}

// REPLICATING THE CODE FOR IMAGE FIEL UPLOADING......

// function isFileTypeSupported(fileType, supportedFileTypes){
//    return supportedFileTypes.includes(fileType);
// }

// async function fileUploader(file, folder)
// {
//     const options = {folder};
//     options.resource-type = "auto";
//     //     return await cloudinary.uploader.upload(file.tempFilePath, options);
//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }
// exports.imgFileUploader = async(req,res) =>{
//    try{ 
//     //fetching the data from the request
//      const {name, tags, email} = req.body;

//     //fetching the img file to be uploaded
//      const file = req.files.ImgFile;

//      //validation over type of file to be uploaded
//      const supportedFile = ["jpg", "jpeg", "png","svg"];
//      const fileType = file.name.split(".")[1];
     
//      if(!isFileTypeSupported(fileType, supportedFileType)){
//       res.status(400).json({
//         success:false,
//         message:"the file type to be uploaded is not supported..."
//       })
      
//       // uploading the file
//       const response = await fileUploader(file, "AvviFolder1");
//       console.log(response);
      

//       // creating a database entry for the data being uploaded
//       const fileData = await  File.create({
//         name,
//         tags,
//         email,
//         imgUrl: response.secure_url,
//       })

//       res.status(200).json({
//         success:true,
//         message:"the file us uploaded successfully",
//       })

//      }

//    }catch(error){
//        res.send(error); 
//    }
// }







// Video uploading handler

exports.videoUploader = async(req,res) => {
    try{
        // fetching the data
         const {name, tags, email} = req.body;
         console.log(name, tags, email);

         const file = req.files.videoFile;

         const fileSupported = ["mp4", "mov"];
         const fileType = file.name.split(".")[1].toLowerCase();
         console.log("The present file Type is :",fileType);

         if(!isFileTypeSupported(fileType, fileSupported))
            {
                return res.status(400).json({
                    success:false,
                    message:"The format of the file is not supported"
                })
            }

          //if the file spent is supported
          console.log("Uplaoding the sent file on cloudinary");

          const response = await uploadFileToCloudinary(file,"AvviFolder1");
          console.log(response);

          // creating a database entry for the uploaded video
          const VideoFiledata = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
          })

          console.log(VideoFiledata);

          res.json({
            success:true,
            message:"Mubarak bhaiaya finally the video is uploaded",
            imageUrl:response.secure_url,

          })
    }     
    catch(error){
      console.error(error);
      return res.status(400).json({
        success:false,
        message:"Something went wrong",
      })
    }
}

// REDUCE SIZE UPLOADER

exports.reduceImgUploader = async(req,res) =>{
  try{
          // fetching data through request 
          const{name, tags, email} = req.body;
          console.log(name, tags, email);
        
          // extracting the file to be uploaded
          const file = req.files.ImgFile;
          console.log(file);

          //validation
          const supportedTypes = ["jpg", "jpeg", "png", "svg"];
          const fileType = file.name.split(".")[1].toLowerCase();
          console.log("file Type ->", fileType);


          if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
          }

          // if file format is supported
          console.log("NOW LETS UPLOAD THE FILE ON OUR CLOUD")
         const response = await uploadFileToCloudinary(file, "AvviFolder1", 30);
         console.log(response);
         // db Entery saving

         console.log("CREATING A DATABASE ENTRY FOR THE UPLOADED FILE")

         const fileData = await File.create({
            name,
            tags,
            email,
            imgUrl:response.secure_url,
         })
          
         console.log(fileData); 

         res.json({
            success:true,
            imgUrl:response.secure_url,
            message:"THE COMPRESSED FILE IS ADDED SUCCESSFULLY...",
         })
       
  }catch(error)
  {
       console.error(error);
      return res.status(400).json({
        success:false,
        message:"Something went wrong",
  });
  }
}
