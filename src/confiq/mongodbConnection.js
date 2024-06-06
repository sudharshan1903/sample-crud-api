import { MongoClient } from "mongodb";

const {MONGODB_URL_LOCAL} = process.env;

const MONGO_CONNECT = MONGODB_URL_LOCAL;

 // create a mongo db connection
const createConnection =async ()=>{
const client = new MongoClient(MONGO_CONNECT);
try {
    console.log("create connection here");
    await client.connect();
    console.log("MongoDB is connected successfully")
    return client;
} catch (error) {
    console.log(error,"error connection to mongodb");
    process.exit(1);
    //throw error;
   
}
}

export {createConnection};