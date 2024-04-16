import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message:{
        type:String,
        reqiured:true,
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
},{
    versionKey:false,
    timestamps:true
})

export const messageModel = mongoose.model("Message",messageSchema);