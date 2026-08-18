import express from "express"
import cors from 'cors'; 



const app = express();

app.use(cors());

app.use(express.json())


app.get("/healthcheck",(req,res)=>{
    console.log("Server is working")
})

export default app;