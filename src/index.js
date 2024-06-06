// predefined package here
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
// routers and controller 
import { createNewUser,loginUser } from './confiq/Contoller.js';
import { RegisterRouter } from './routes/Register.js';

const app = express();
const PORT = 4000;

// middle ware 
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/getres",(req,res)=>{
    res.send("server is on the host ");
})

//use router middleware here
app.use("/", RegisterRouter);


// controller here
app.post("/register",createNewUser);

app.post("/login",loginUser);

app.listen(PORT,()=>console.log(
`server  started on port`,PORT)
);
