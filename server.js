const express = require("express");
const cookie = require("cookie-parser")
const app = express()
app.use(express.json())
app.use(cookie());
const route = require("./routes")
app.use("/",route)

app.listen(3000,()=>{
    console.log("listning to port");
})