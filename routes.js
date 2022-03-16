const auth=require('./midleware/jwt')
const express = require("express");
var router = express.Router();
//
// require userTable
var {
    creatuser,
    userlogin,}= require("./controler/userTable");

//require posts table
var {
    createpost,
    readpost,}= require("./controler/posts");

//likedislike;
var{
    likeDislikes,
    read,}= require("./controler/likeDislike");



var bodyParser = require("body-parser");

var urlencodeparser =bodyParser.urlencoded({extended:false});

router.use(bodyParser.json());



// usertale
router.post('/signup',creatuser);
router.post('/login',userlogin);


//post
router.get('/read',readpost)
router.post('/creat',auth,createpost)

//likeDislike
router.post('/api/creat',auth,likeDislikes)
router.get('/api/read',auth,read)

module.exports=router;