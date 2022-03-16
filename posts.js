const knex=require("../databases/databases")

const {authenticateToken}=require("../midleware/jwt.js");


const createpost = (req,res)=>{
    user_id=res.tokendata.id
   const{title,description}=req.body
    if(title==undefined || description==undefined || user_id==undefined){
        console.log("all fileds require");
        res.send("all feileds require")
    }
    else{
    knex("posts").insert({
        title :req.body.title,
        description :req.body.description,
        user_id:res.tokendata.id
    }) .then(()=>{
        res.send({message:"post cresated successfuly.."})
    }).catch((err)=>{
       console.log(err);
       res.status(404).json({message:"caanot create"})
    })
}
}

const readpost = (req,res)=>{
    knex.select("*").from('posts').join("userTable","posts.post_id","userTable.id")
        .then((rows) => {
            res.send(rows)
        })
        .catch((err) => {
             console.log( err)
             res.send(err)
            })
        
}



// app.get('/api/userOrders', authenticateToken, (req, res) => {
//     // executes after authenticateToken
//     // ...
//     res.status(200);
//   })



module.exports={
    createpost,
    readpost,

}




