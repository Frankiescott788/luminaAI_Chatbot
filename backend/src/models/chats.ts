import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    chat_id : {
        type : String,
        required : true
    },
    title: {
        type: String,
        required: true
    },
    chats: [new Schema({
        role: {
            required: true,
            type: String
        },
        parts: [{
            text: { type: String, required: true }
        }]
    }, { timestamps: true })]
}, { timestamps: true });

const AIChat = model("chats", chatSchema);

export default AIChat;
