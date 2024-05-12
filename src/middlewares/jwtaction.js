require('dotenv').config();
let jwt = require('jsonwebtoken');

const createJWT = (payload) =>{
    let key = process.env.JWT_SECRET;
    let token = null;
    try{
        token = jwt.sign(payload,key);
        // console.log(token);
    } catch(err){
        console.log(err);
    }
    
    return token;
}
const verifyToken = (token) =>{
    let key = process.env.JWT_SECRET;
    let decoded = null;
    jwt.verify(token,key,(err,result) => {
        if(err){
            console.log(err);
            // return decoded;
        }
        // console.log('ha')
        decoded = result; 
    })
    return decoded;
}

const checkUserJWT = (req,res,next) =>{
    let cookies = req.cookies;
    if(cookies && cookies.jwt){
        let token = cookies.jwt;
        let decoded = verifyToken(token);
        if(decoded){
            next();
        } else {
            res.status(401).json({message: 'Unauthenticated'})
        }
    } else {
        res.status(401).send('Unauthenticated');
    }
}

module.exports = {createJWT, verifyToken, checkUserJWT}; 