import { comparePassword, genPassword, tokenGenerator } from "./authUtils.js";
import { sendEmail } from "./emailService.js";
import { createConnection } from "./mongodbConnection.js";

const { MONGODB_DATABASE, MONGODB_COLLECTION } = process.env;

const createNewUser = async (req, res) => {
    try {
        
        // db connection here
        const client = await createConnection();
        const db = client.db(MONGODB_DATABASE); // db means database
        const newUserCollection = db.collection(MONGODB_COLLECTION); // collection
      
        const body = req.body;
        const hashPassword= await genPassword(body.userPassword)

        
        // check user already exist or not here
        const existingUser = await newUserCollection.findOne({userEmail:body.userEmail})
        if(existingUser)
        {
          return res.json({success:false,message:'user already exist with this email'})
        }


        const newUserDetails = {
            userName:req.body.userName,
            userEmail:req.body.userEmail,
            userPassword:hashPassword,
        }
        

        const result = await newUserCollection.insertOne(newUserDetails);
        
       return res.json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.log("register error in controller", error);
        res.json({ success: false, message: 'Register new user failed' });
    }
};

const loginUser =async (req, res) => {
    try {
        const client = await createConnection();
        const db = client.db(MONGODB_DATABASE);
        
        const userCollection = await db.collection(MONGODB_COLLECTION);
         const {userEmail,userPassword} = req.body;
        const user = await userCollection.findOne({userEmail})
        if(!user)
        {
              return res.json({success:false,message:'Invalid email or password'})
        }
 const isPasswordValid = await comparePassword(userPassword,user.userPassword);
   if(!isPasswordValid)
    {
        return res.json({success:false, message:'Invalid password'})
    }        
    const token = tokenGenerator({id:user._id});
    const getUserData = {
        Id:user._id,
        Name:user.userName,
        Mail:user.userEmail
    }
    
      return res.json({ success: true, message: 'User logged in successfully',token,getUserData });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const sendEmailController = async (req, res) => {
    const { to, subject, text } = req.body;
    const emailResponse = await sendEmail(to, subject, text);
    return res.status(emailResponse.success ? 200 : 500).json(emailResponse);
};


export { createNewUser, loginUser ,sendEmailController};
