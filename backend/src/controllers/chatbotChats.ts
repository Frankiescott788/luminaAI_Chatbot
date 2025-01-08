import {Request, Response, text} from "express";
import AIChat from "../models/chats";
import {GoogleGenerativeAI} from "@google/generative-ai";
import mongoose from "mongoose";

const genAI = new GoogleGenerativeAI("AIzaSyBHIfoxqNUrtEiu9gFirDHZWDXw27Y6Iy8");

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

export const getUserChats = async (req: Request, res: Response) : Promise<any> => {
    try {
        const UserChats = await AIChat.find({user_id: req.userid});
        if (!UserChats) {
            return res.status(404).json({err_msg: "No chats Yet"});
        }
        res.status(200).json({data: UserChats});
    } catch (error: any) {
        console.log(error.message);
        return res.status(500).json({
            err : "Internal server error",
            details : error.message
        })

    }
};

export const getChat = async (req: Request, res: Response): Promise<any> => {
    try {
        const {chatid} = req.params;
        const {message} = req.body;
        const UserChats = await AIChat.find({user_id: req.userid});
        if (!UserChats) {
            return res.status(404).json({err_msg: "No chats Yet"});

        }

        if (!mongoose.Types.ObjectId.isValid(chatid)) {
            return res.status(400).json({ err_msg :  "Invalid Chat Id"})
        }
        const chat = await AIChat.findById(chatid);

        if (!chat) {
            return res.status(404).json({err_msg: "No such chat in the database"});

        }

        const history = chat.chats.map(chat => ({
            role: chat.role,
            parts: chat.parts.map(text => ({
                text: text.text
            }))
        }))

        if (history[0]?.role === "model") {
            history.unshift({
                role: "user",
                parts: [{text: "Start the conversation"}],
            });
        }
        const chatSession = model.startChat({
            history
        });

        const results = await chatSession.sendMessage(message);

        await AIChat.findOneAndUpdate(
            {_id: chatid},
            {
                $push: {
                    chats: {
                        $each: [
                            {
                                role: "user",
                                parts: [{text: message}],
                            },
                            {
                                role: "model",
                                parts: [{text: results.response.text()}],
                            }
                        ],
                    },
                }
            },
            {new: true}
        );

        res.status(200).json({data: chat.chats});

    } catch (error: any) {
        console.log(error)
    }
};

