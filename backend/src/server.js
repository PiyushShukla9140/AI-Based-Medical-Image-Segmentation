import app from "./app.js";
import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
})
import dbConnect from "../db/index.js";




const PORT = process.env.PORT || 8000;

dbConnect()
.then(()=>
{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    });
}).catch((err)=>{
    console.log("Error connecting the database");
})







