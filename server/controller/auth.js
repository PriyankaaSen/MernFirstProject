const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../model/userSchema");


exports.signup = async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "pls fill the property" });
  }
  try{
     const userExist= await User.findOne({ email: email });
     if (userExist) {
       return res.status(422).json({ error: "Email already exist" });
     }else if(password != cpassword){
       return res.status(422).json({ error: "password does not match" });
     }else{
       const user = new User({ name, email, phone, password, cpassword });
       await user.save();
       res.status(201).json({ message: "user registered successfully" });
     }
  }catch(err){
    console.log(err);
  }
}

// signin

exports.signin = async (req, res)=>{
  try{
    let token;
    const {email, password} = req.body;
    if(  !email || !password){
      return res.status(400).json({error:"pls fill the detail"})
    }

    const userLogin = await User.findOne({email:email});
    // console.log(userLogin);

    if(userLogin && userLogin.role === 'user'){
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const {name, email, phone, role} = userLogin;

        token = await userLogin.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token,{
          expires:new Date(Date.now()+2589200000),
          httpOnly:true
        });

      if(!isMatch){
        res.status(400).json({error:"invalid credentials"});
      }else{
        res.json({token,data:{name, email, phone, role},message:"user signin successfully"});
      }
    }else{
      res.status(400).json({error:" invalid credentials "});
    }

  }catch(err){
    console.log(err);
  }
}

exports.profile = (req, res, next) =>{
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.SECRET_KEY);
  req.user = user;
  next();
  // jwt.decode();
}
