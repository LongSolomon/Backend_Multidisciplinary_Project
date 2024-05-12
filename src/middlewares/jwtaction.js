require('dotenv').config();
let jwt = require('jsonwebtoken');

const createJWT = () =>{
    let key = process.env.JWT_SECRET;
    let token = null;
    try{
        token = jwt.sign({data:'foobar'},key);
        console.log(token);
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
        console.log('ha')
        decoded = result; 
    })
    return decoded;
}
module.exports = {createJWT, verifyToken};