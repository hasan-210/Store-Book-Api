const jwt = require('jsonwebtoken')

function verfiyToken(req,res,next){
    const token = req.headers.token;
    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
            // add new obj (user) to request
            req.user = decoded;
            next();
        } catch (error) {
        res.status(401).json({message : "Unauthorized"})
        }
    }else{
        res.status(401).json({message : "Unauthorized"})
    }
}
// verfiy Token And Authorize the user
function verfiyTokenAndAuthorizationUser(req,res,next){
    verfiyToken(req,res,()=>{
        // get if user himself get data OR Admin get user data
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            // 403 Forbidden
            res.status(403).json({message : "You are not allowed"});
        }
    })
}

// verfiy Token And Authorize the user
function verfiyTokenAndAdmin(req,res,next){
    verfiyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            // 403 Forbidden
            res.status(403).json({message : "You are not allowed , only admin allowed"});
        }
    })
}
module.exports = {
    verfiyToken,
    verfiyTokenAndAuthorizationUser,
    verfiyTokenAndAdmin
} ;