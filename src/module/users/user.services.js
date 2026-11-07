
import { notesmodel } from "../../DB/models/notes.model.js";
import { usermodel } from "../../DB/models/user.model.js"


export const signupService = async ({
    name,
    email,
    password,
    Phone,
    age
}) => {
    const user = await usermodel.findOne({ email })
    if (user) {
        throw new Error("Email already exists");
    }
    const neswuser = await usermodel.create({
        name,
        email,
        password,
        Phone,
        age
    })
    return neswuser;
}

export const loginservices = async ({ email, password }) => {
    const user = await usermodel.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    if (user.password !== password) {
        throw new Error("Invalid password");
    }

    return user;
}

export const updateUserService = async(id , data)=>{
    delete data.password;
    const user = await usermodel.findByIdAndUpdate(id , data)
    return user
} 


export const deleteUserService = async(id)=>{
    const user = await usermodel.findByIdAndDelete(id)
    return user
}



export const getbyid = async(id)=>{
    const user = await usermodel.findById(id)
    return user;
}


export const createNoteService = async (body, id) => {
    const note = await usermodel.create({
        ...body,
        userId: id
    });

    return note;
}


export const updateNoteService = async (noteId, id, data) => {
    const note = await usermodel.findOneAndUpdate(
        { _id: noteId, userId: id },
        data,
        { new: true }
    );

    return note;
}




export const replaceNoteService = async (noteId, id, data) => {
    const note = await usermodel.findOneAndReplace(
        { _id: noteId, userId: id },
        {
            ...data,
            userId: id
        },
        { new: true }
    );

    return note;
}




export const updateAllNotesService = async (id, title) => {
    const notes = await usermodel.updateMany(
        { userId: id },
        { $set: { title } }
    );

    return notes;
}



export const deleteNoteService = async (noteId, id) => {
    const note = await usermodel.findOneAndDelete({
        _id: noteId,
        userId: id
    });

    return note;
}



export const paginateSortNotesService = async (id, page, limit) => {
    const skip = (page - 1) * limit;

    const notes = await usermodel.find({ userId: id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    return notes;
}








export const getNoteByIdService = async (noteId, id) => {
    const note = await usermodel.findOne({
        _id: noteId,
        userId: id
    });

    return note;
}




export const getNoteByContentService = async (content, id) => {
    const note = await usermodel.findOne({
        content,
        userId: id
    });

    return note;
}




export const getNotesWithUserService = async (id) => {
    const notes = await usermodel.find({ userId: id })
        .select("title userId createdAt")
        .populate("userId", "email");

    return notes;
}



import mongoose from "mongoose";

export const aggregateNotesService = async (id, title) => {
    const notes = await usermodel.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(id),
                ...(title && {
                    title: { $regex: title, $options: "i" }
                })
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $project: {
                title: 1,
                content: 1,
                userId: 1,
                "user.name": 1,
                "user.email": 1
            }
        }
    ]);

    return notes;
}



export const deleteAllNotesService = async (id) => {
    const notes = await notesmodel.deleteMany({
        userId: id
    });

    return notes;
} 








