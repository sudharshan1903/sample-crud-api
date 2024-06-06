import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const {jwtSecretKey} = process.env

// generate hash code salt password
const genPassword = async(password)=>{
    const round = 10;
    const salt = await bcrypt.genSalt(round);
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword;
}
// password check 
const comparePassword = async(password,storedPassword)=>{

const isPasswordMatch = await bcrypt.compare(password,storedPassword);
return isPasswordMatch;
}

// token generator
const tokenGenerator = (unique,secretkey=jwtSecretKey)=>jwt.sign(unique,secretkey);

// token verifcation

const tokeVerifier = (token,secretkey=jwtSecretKey)=>jwt.verify(token,secretkey);

export{
    genPassword,
    comparePassword,
    tokenGenerator,
    tokeVerifier
};