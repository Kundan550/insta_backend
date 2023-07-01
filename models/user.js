const mongoose = require('mongoose');
const {ObjectId}  =mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
     type:String,
     default:"https://res.cloudinary.com/doahw1qkf/image/upload/v1688121571/no_img_dwl5re.png"
    },
    followers:[
        {type:ObjectId,ref:"User"}
    ],
    following:[
        {type:ObjectId,ref:"User"}
    ]
})
mongoose.model("User",userSchema);