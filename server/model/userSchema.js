const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true,
    min:3,
    max:20
  },
  email:{
    type:String,
    required:true,
    trim:true,
    unique:true
  },
  phone:{
    type:Number,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  cpassword:{
    type:String,
    required:true
  },
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  },
  profilePicture:{
    type:String,
  },
  isDeleted: {
    type: Boolean,
    default: 0
  } ,
active: { type: Boolean, default:0},
  date:{
    type:Date,
    default:Date.now
  },
  messages:[
    {
          name:{
            type:String,
            required:true
          },
          email:{
            type:String,
            required:true
          },
          phone:{
            type:Number,
            required:true
          },
          message:{
            type:String,
            required:true
          }
    }
  ],
  tokens:[
    {
      token:{
        type:String,
        required:true
      }
    }
  ]
})

// we are hashing the password
userSchema.pre('save', async function(next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

// we are generating token
userSchema.methods.generateAuthToken = async function (){
  try{
    let token = jwt.sign({_id:this._id,role:this.role}, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token:token});
    await this.save();
    return token;
  }catch(err){
    console.log(err);
  }
}

// store messages

userSchema.methods.addMessage = async function(name, email, phone, message){
  try{
    this.messages = this.messages.concat({name, email, phone, message});
    await this.save();
    return this.messages;
  }catch(error){
    console.log(error);
  }
}

// collection creation
const User = mongoose.model('USER',userSchema);

module.exports = User;
