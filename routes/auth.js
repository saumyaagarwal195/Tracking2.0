const router = require("express").Router();
const User= require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//the user is always registered as not admin. Admin status has to be changed directly from database
//header value: key:token value: Bearer tokenno
//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
  
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //LOGIN
  
  router.post('/login', async (req, res) => {
      try{
          const user = await User.findOne({ username: req.body.username});
          if (!user) {return res.status(400).send("Wrong user");}
        //    console.log(user.username);
        //    console.log(req.body.username);
          
        //    console.log(user.password);

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        //  console.log(originalPassword)
        const inputPassword = req.body.password;
        //  console.log(inputPassword);
        if(originalPassword !== inputPassword) {
            return res.status(401).json("Wrong Password");}
        
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
            }, 
            process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
        
        const { password, ...others}=user._doc;
        
        return res.status(200).json({...others, accessToken});
  
    }catch(err){
        return res.status(500).json(err);
    }
});

module.exports = router