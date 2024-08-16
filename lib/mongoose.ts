"use server";
import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async () =>{
    mongoose.set('strictQuery', true);
    if(!process.env.MONGO_URI) return console.log("MONGO URI not found");
    if(isConnected)return console.log("using existing DB connection");
    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
    } catch (error : any) {
        console.log(error.message);
    }
}