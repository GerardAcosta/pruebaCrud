import mongoose from "mongoose";
import 'dotenv/config';


export const client = mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("BASE DE DATOS CONECTADA")
});

