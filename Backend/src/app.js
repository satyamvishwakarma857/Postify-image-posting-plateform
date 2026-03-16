const express = require("express");
const postModels = require("./models/post.models")
const multer = require("multer");
const uploadFile = require("./services/storage.service")
const app = express();
const cors = require("cors")
//middileware
// app.use(express.json());
app.use(cors());


const upload = multer({storage: multer.memoryStorage()})

//post api
app.post('/create-post',upload.single("image"),async(req,res)=>{
    const caption = req.body;
    const img = req.file;
    // console.log(req.body);
    // console.log(req.file);

    const result = await uploadFile(req.file.buffer)
    // console.log(result);
    
    const post = await postModels.create({
        image: result.url,
        caption : req.body.caption
    })

    res.status(201).json({
        message: "post created successfully",
        
    })
    

  

})
app.get("/",(req,res)=>{
    res.send("API working")
})

app.get("/posts",async(req,res)=>{
    const data = await postModels.find();

    res.status(200).json({
        message: "get data successfully",
        data
    })

})






module.exports = app