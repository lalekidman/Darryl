let express = require("express");
let app = express.Router();
let path = require('path');
app.get("*",(req,res)=>{
	res.sendFile(path.join(__dirname,"../views/dist/index.html"))
});

module.exports = app; 