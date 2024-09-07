// const jwt = require('jsonwebtoken');
// const JWT_secure="Naman@!15"

// const fetchUser =(req,res,next)=>{
//     const token=req.header('auth-token')
//     if(!token){
//         res.status(401).send({error:"Please use a valid token "})
//     }
//     try{
//         const data=jwt.verify(token,JWT_secure);
//         req.user=data.user;
//         next();
//     }catch(error){
//         res.status(401).send({error:"Please use a valid token "})
//     }
   
// }

// module.exports=fetchUser;

const jwt = require('jsonwebtoken');
const JWT_secure = "Naman@!15";

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    
    // If no token is provided, send a 401 response and do not call next()
    if (!token) {
        return res.status(401).send({ error: "Please use a valid token" });
    }
    
    try {
        const data = jwt.verify(token, JWT_secure);
        req.user = data.user;
        next();  // Only call next() if token is verified and user data is set
    } catch (error) {
        return res.status(401).send({ error: "Please use a valid token" });
    }
};

module.exports = fetchUser;
