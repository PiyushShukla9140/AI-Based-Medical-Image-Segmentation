import mongoose, {Schema, model}from "mongoose"

const patientSchema = new Schema({
    name:{
        type:String,
        required:[true,"Patient name is required"],
        trim:true
    },
    doctor:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    age:{
        type:Number,
        required:true,
        min:0
    },
    gender:{
        type:String,
        enum: ["Male", "Female", "Other"],
        required:true
    },
    medicalNotes:{
        type: String,
        default: ""
    },
    contact:{
        type: String,
        default: ""
    }

},{timestamps:true})


export const Patient = model("Patient",patientSchema)