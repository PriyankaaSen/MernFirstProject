const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../../model/userSchema");

exports.signup = async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "pls fill the property" });
  }
  try{
     const userExist= await User.findOne({ email: email });
     if (userExist) {
       return res.status(422).json({ error: "admin email already exist" });
     }else if(password != cpassword){
       return res.status(422).json({ error: "password does not match" });
     }else{
       const user = new User({ name, email, phone, password, cpassword, role:'admin' });
       await user.save();
       res.status(201).json({ message: "admin registered successfully" });
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

    const adminLogin = await User.findOne({email:email});
    console.log("admin data",adminLogin);

    if(adminLogin && adminLogin.role === 'admin'){
      const isMatch = await bcrypt.compare(password, adminLogin.password);
      const {name, email, phone, role} = adminLogin;

        token = await adminLogin.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token,{
          expires:new Date(Date.now()+2589200000),
          expiresIn:'1h',
          httpOnly:true
        });

      if(!isMatch){
        res.status(400).json({error:"invalid credentials"});
      }else{
        res.json({token, data:{name, email, phone, role},message:"user signin successfully"});
      }
    }else{
      res.status(400).json({error:" invalid credentials "});
    }

  }catch(err){
    console.log(err);
  }
}

exports.signout = (req,res) => {

    res.clearCookie('token');
    localStorage.clear();
    localStorage.removeItem('data');
              localStorage.removeItem('token');
    res.status(200).json({message: 'signout successfully'});

}

exports.userdatalist = async (req, res) => {
  const findAllUser= await User.find({});
  console.log(findAllUser);
  if (findAllUser) {
    res.status(201).send({message:" Get all User successfully...",findAllUser});
  }else{
    res.status(400).send({error:"No User in database...",error});
  }
}

exports.deleteUser = (req,res) => {
  users =users.filter((data)=> data.id !== req.params.id);
  res.send('user deleted')
}

exports.profile = (req, res, next) =>{
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.SECRET_KEY);
  req.user = user;
  next();
  // jwt.decode();
}
