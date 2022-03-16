
const jwt = require("jsonwebtoken")

// module.exports = (req,res,next)=>{
//   try {
//     jwt.verify(req.cookies.user, "ushapaswan@123");
//     var decode = req.cookies.user
//     req.userToken = decode
  
//     next()
//   }catch(err){
//     res.status(401).json({
//       message:"login failed"
//     })
//   }
// }



module.exports=(req, res, next)=>{
  // console.log(`this is the cookie ${req.cookies.user}`);
  const tokendata = req.cookies.user

  if (tokendata == null) return res.sendStatus(401)

  jwt.verify(tokendata, "ushapaswan@123", (err, tokendata) => {

    if (err) return res.sendStatus(403)

    res.tokendata=tokendata
    // console.log(tokendata);
    next()
  })
}



