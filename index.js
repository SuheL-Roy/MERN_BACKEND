
const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose =  require("mongoose");
const router = require("./Routes/auth.js");
const updaterouter = require('./Routes/Users.js');
const postrouter = require('./Routes/Posts.js');
const Catagoryrouter = require('./Routes/categories.js');


const multer = require("multer");
const path = require("path");


dotenv.config();
app.use(express.json());
app.use("/Images", express.static(path.join(__dirname , "./Images")));

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false

}).then(console.log("connect to mongoDB"))
.catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination:(req, file, cb) => {

       cb(null,"Images")

    },filename:(req, file, cb) => {

        cb(null, req.body.name);
    }
});

const upload = multer({storage:storage});
app.use("/api/upload",upload.single("file"), (req,res)=>{
    res.status(200).json("File has been uploaded");
})


app.use("/api/auth", router);
app.use("/api/users", updaterouter);
app.use("/api/posts", postrouter);
app.use("/api/catagories", Catagoryrouter);


app.listen("5000", ()=>{
    console.log("server is runing");
})