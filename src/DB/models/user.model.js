import { model, Schema } from "mongoose";
import { type } from "node:os";



const userschema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min : 18 ,
        max : 60 
    }
}, {
    timestamps: true,
    strict: false
})

export const usermodel = model("User", userschema)




