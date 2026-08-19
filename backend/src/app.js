import express from "express"
import cors from 'cors'; 
import cookieParser from "cookie-parser";




const app = express();

app.use(cors());

app.use(express.json())
app.use(cookieParser());


app.get("/healthcheck",(req,res)=>{
    console.log("Server is working")
})

export default app;