const knex=require("../databases/databases");

const likeDislikes = (req,res)=>{
    users=res.tokendata.id;
    knex.select("*").from("likeDislike").where("user_id","=",users ,"post_id","=",req.body.post_id)
   .then((data)=>{
       console.log(data.length);
       console.log(data)
        if(data.length>0){
            res.send("you have already liked the post")
        }
        else {
            knex("likeDislike").insert({
                like :req.body.like,
                dislike :req.body.dislike,
                user_id:res.tokendata.id,
                post_id:req.body.post_id
            }) .then(()=>{
                res.send({message:"you have succesfully like or dislike posts"})
            }).catch((err)=>{
               console.log(err);
               res.status(404).json({message:"caanot iseret all feileds require"})
            })
        }
       
   })
   .catch((err)=>{
       console.log(err);
   })
}

const read = (req,res)=>{
    
    knex.select("*").from("likeDislike").join("posts","posts.post_id","likeDislike.post_id")
    .then((rows) => {
        res.send(rows)
    })
    .catch((err) => {
         console.log( err)
         res.send(err)
        })
}
module.exports={likeDislikes,read}