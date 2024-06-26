
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});
//SHIFT THIS CONFIGURATION UNDER CONFIG FOLDER
// Post middleware begins from here
fileSchema.post("save", async function(doc)
{
    try{
        console.log("Doc->",doc);
  // now begining with the use of nodemailer
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.USER_PASSWORD,
        },
    });

    // sending email
    let info = await transporter.sendMail({
      from:"Pachauri Bhai",
      to:doc.email,  // sending the data to the stored email in the request
      subject:"to intimate about the uploading file to cloudinary",
      html:`<h2>Yey mubaaraak hoo your file is uploaded at cloudinary</h2>
      view here -> <a href="${doc.imageUrl}>" `,
    })
     
    console.log(info);

    }catch(error)
    {
      console.error(error);
    }

})

const File = mongoose.model("File", fileSchema);
module.exports = File;