import { model, Schema } from "mongoose";
import { type } from "node:os";

const noteschema = new Schema({
    title: {
        type: String,
        required: true,
           validate: {
            validator: function (value) {
                return value !== value.toUpperCase();
            },
            message: "Title cannot be entirely uppercase"
        }

    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type : Schema.Types.ObjectId,
        ref : "User",
        required: true
    }
},{
    timestamps : true
})

export const notesmodel = model("Notes" , noteschema)

