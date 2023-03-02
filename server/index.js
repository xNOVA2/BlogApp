const express = require('express');
const app = express();
require('./connection/MongoDB');
const joi = require('joi')
const bcrypt = require('bcrypt');
const User = require('./Schema/UserSchema')
const cors = require('cors')
const jwt = require('jsonwebtoken')
let cookieParser = require('cookie-parser')
const auth = require('./middleware/varify')
const multer = require('multer');
const UserPost = require('./Schema/PostSchema')
const fs = require('fs');
const { userInfo } = require('os');


// middleware
app.use(express.json())
app.use(cookieParser())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth-token");
  next();
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cors({
  exposedHeaders: ['auth-token']
}));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));


app.post('/register', async (req, res) => {
    const { username, password } = req.body

    const UsernameCheck =await User.findOne({username})
    if(UsernameCheck){
        return res.send("USER ALREADY EXIST").status(403)
    }
    const Joi = joi.object({
        username: joi.string().min(4).max(20).required(),
        password: joi.string().min(6).max(30).required()
    })

    const { error } =  Joi.validate({ username: username, password: password })
    if (error) { return res.send(error.details[0].message).status(403) }

    const salt  = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt)

    const result = await  User({
        username:username,
        password:hashPassword
    })

    const data = await result.save()
    res.send("USER CREATED").status(200)
})
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    let usernameCheck = await User.findOne({ username });
    if (!usernameCheck) {
      return res.status(401).json({ success: false, message: "INCORRECT USERNAME" });
    }
    let passwordCheck = await bcrypt.compare(password, usernameCheck.password);
    if (!passwordCheck) {
      return res.status(401).json({ success: false, message: "INCORRECT PASSWORD" });
    }
    const Token = jwt.sign({ _id: usernameCheck._id, username: usernameCheck.username }, 'huihrau');
    res.cookie('auth-token', Token, { httpOnly: false ,sameSite:'none',secure:true});
    res.cookie('username',usernameCheck.username);

    return res.status(200).send({message:"LOGIN"})
  });
  
 
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
  cb(null,'uploads')
  },
  filename: function(req, file, cb) {
    cb(null,file.originalname)
  }
});
  
  const upload = multer({ storage: storage });

  // post title file name description 

  

  app.post('/upload',auth ,upload.single('file'), function(req, res) {
    const author = req.user.username
    const newFile = new UserPost({
      author: author,
      title: req.body.title,
      description: req.body.description,
      file:{
        data:fs.readFileSync('uploads/'+req.file.filename),
        contentType:'image/png'
        
      }
    });
    // Save the new instance to the database
    newFile.save(function(err) {
      if (err) {
        console.log(err);
        res.status(500).send('Error uploading file');
      } else {
        res.status(200).send('File uploaded successfully');
      }
    });
  });

  app.get('/getAllPost', async(req,res)=>{
   const data = await UserPost.find()
   res.json(data).status(200)
  })

  app.get('/ProfileInfo:author', async(req,res)=>{
    const user  = req.params.author
    const data = await UserPost.find({author:user})
    res.send(data)
  })
  
  app.delete('/:_id',auth,async (req,res)=>{
const { _id } = req.params;
let data = await UserPost.findByIdAndDelete(_id)
res.json({message:"delete"})

  })
app.listen(3000, () => {
    console.log("SERVER UP AND RUNNUNG");
})