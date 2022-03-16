const knex=require("../databases/databases")
const jwt = require("jsonwebtoken")

const creatuser = (req,res)=>{
    const{name,email,password}=req.body
    if(name==undefined || email==undefined || password==undefined){
        console.log("all fileds require");
        res.send("all feileds require")
    }
    else{
    knex("userTable").insert({
        name: req.body.name,
        email: req.body.email,
        password:req.body.password
    })
    .then((data)=>{
        res.send({message:"account cresated successfuly.."})
    })}
}
const userlogin = (req,res)=>{
    knex.select("*").from("userTable").where("email","=",req.body.email)
    .then((data)=>{
        if(data[0].password===req.body.password){
            console.log("usha",data);
            token_data=jwt.sign({id:data[0].id},"ushapaswan@123");
            res.cookie('user',token_data)
            console.log(token_data);
            res.send({message:"login successfuly..",token_data:token_data})
        }
        else{
            console.log("inccorect password cannot login");
            res.send("inccorect password cannot login")
        }
        
    }).catch((err)=>{
        res.send({
            error:err
        })
    })
    
    
}



module.exports={
    creatuser,
    userlogin,
}




