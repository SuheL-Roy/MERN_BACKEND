
const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose =  require("mongoose");
const router = require("./Routes/auth.js");
const updaterouter = require('./Routes/Users.js')


dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false

}).then(console.log("connect to mongoDB"))
.catch((err) => console.log(err));

app.use("/api/auth", router);
app.use("/api/users", updaterouter);


app.listen("5000", ()=>{
    console.log("server is runing");
})