const express = require('express');
const router = express.Router();
const user = require('../modules/UserModuel')
const cryptoJS= require('crypto-js')
const jwt = require('jsonwebtoken')

//**********************REGISTERTION******************************/
router.post('/register' , async (req,res)=>{
    const newUser = new user({
        username : req.body.username ,
        email :req.body.email,
        password:cryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD
          ).toString()
    });
    try {
        const saveduser =  await newUser.save();
        res.status(200).json(saveduser)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})


//**********************LOGIN******************************/

router.post('/login' , async (req,res)=>{
   try {
       const User = await user.findOne({username : req.body.username});
       !User && res.status(401).json("Wrong User Name");

       
       const hashedPassword = cryptoJS.AES.decrypt(
        User.password,
        process.env.PASSWORD
         );

         const password = hashedPassword.toString(cryptoJS.enc.Utf8);

         const inputPassword =req.body.password 

         password !== inputPassword && res.status(401).json("Wrong passowrd");
         const jwt_pass = 0000

         const token = jwt.sign({id:User._id , isAdmin :User.isAdmin}, process.env.JWT_SEC, {

            expiresIn: '365d' // expires in 365 days
 
       });

         

         res.status(200).json({User,token})
   } catch (error) {
    console.log(error)
   }
})
module.exports = router 