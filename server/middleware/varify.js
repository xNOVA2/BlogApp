const jwt = require('jsonwebtoken')
const auth = (req,res,next) =>{

    const token = req.headers['auth-token']
   if(!token){
    return res.send("ACCESS DENIED"); 
   }
    try {
        const verify = jwt.verify(token,'huihrau');
        req.user = verify;
        next()
    } catch (error) {
        if(error){
            return res.send({message:"SERVER ERROR"})
        }
    }

}

module.exports = auth