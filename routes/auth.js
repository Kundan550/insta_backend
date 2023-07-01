const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const{JWT_SECRET} = require('../keys')
const requireLogin =require('../middleware/requireLogin')
router.get('/',(req,res)=>{
    res.send("hello")
})




router.post('/signup',(req,res)=>{
    const {email,name,password,pic} = req.body
    if(!email || !name || !password)
    {
       return res.status(422).json({error:"pleadse add all fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                email,
                name,
                password:hashedpassword,
                pic:pic
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
      
    })
    .catch(err=>{
        console.log(err)
    })
}) 


router.post('/signin',(req,res)=>{
    const {email ,password} = req.body
    if(!email || !password)
    {
       return res.status(422).json({error:"pleade add all fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser)
        {
           return res.status(422).json({error:"invalid email or pass"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
          if(doMatch)
          {
            //res.json({message:"successfully signed in"})
            const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
            const {_id,name,email,followers,following,pic} = savedUser
            res.json({token,user:{_id,name,email,followers,following,pic}})
          }
          else{
            res.status(422).json({error:"invalid pass or email"})
          }
         })
         .catch(err=>{
            console.log(err)
         })
    })
})

module.exports = router