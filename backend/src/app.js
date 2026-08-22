import express from "express"
import cors from 'cors'; 
import cookieParser from "cookie-parser";




const app = express();

app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,// CORS_ORIGIGN will store the frontend url
        credentials:true// this is for cookies
    }
));
//CORS stands for Cross-Origin Resource Sharing.
//It's a browser security mechanism that controls whether a frontend running on one origin is allowed to make requests to a backend running on a different origin.

app.use(express.json({ limit: "16kb" }));
/*
If the client sends JSON data in the request body, parse it so I can access it through req.body.

Don't accept JSON request bodies larger than 16 KB
But multer middleware has different stroage limits for file
 */

app.use(express.urlencoded({ extended: true, limit: "16kb" })); 

app.use(cookieParser());

import userRoutes from "./routes/user.routes.js"
app.use("/api/v1/users",userRoutes)


app.get("/healthcheck",(req,res)=>{
    console.log("Server is working")
})

export {app}