import { Router } from "express";
import { createNewUser, loginUser, sendEmailController } from "../confiq/Contoller.js";

const router = Router();


// register router end point here

router.post("/register",async(req,res)=>{
try {
    console.log("register router entered");
    await createNewUser(req,res);
} catch (error) {
    console.log(error);
    return res.json({success:false,message:'Internal server error end point router'})
}
});



// login router end point here

router.post("/login",async(req,res)=>{
try {
    console.log("login router entered");
    await loginUser(req,res);
} catch (error) {
    console.log(error);
    return res.json({success:false,message:'Internal server error end point router'})
}
});
// send email router end point here
router.post("/send-email", async (req, res) => {
    try {
        console.log("send email router entered");
        await sendEmailController(req, res);
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Internal server error end point router' });
    }
});



export const RegisterRouter = router;