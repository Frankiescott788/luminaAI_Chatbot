import {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} from "@google/generative-ai";
import {Request, Response} from "express";
import {Chats} from "../types/types";
import AIChat from "../models/chats";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API as string);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

let history: Chats[] = [];

export default async function Chat(req: Request, res: Response) {
    try {
        let create_chat = await AIChat.findOne({ chat_id : "5551"});

        if (!create_chat) {
            create_chat = await AIChat.create({
                user_id: req.userid,
                chat_id : "5551",
                title: "new chat",
                chats: [
                    {
                        role: "model",
                        parts: [
                            {
                                text: "hi how can i help you"
                            }
                        ]
                    }
                ]
            });
        }
        const chatSession = model.startChat({
            history
        });

        const result = await chatSession.sendMessage(req.body.message);

        history.push(
            {
                role: "user",
                parts: [
                    {
                        text: req.body.message
                    }
                ]
            },
            {
                role: "model",
                parts: [
                    {
                        text: result.response.text()
                    }
                ]
            }
        );

        create_chat.chats.push({
                role: "user",
                parts: [
                    {
                        text: req.body.message
                    }
                ]
            },
            {
                role: "model",
                parts: [
                    {
                        text: result.response.text()
                    }
                ]
            })
        await create_chat.save()
        res.status(200).json({res: result});

        if (history.length >= 6 && create_chat.title === "new chat") {
            const result = await chatSession.sendMessage("Give this chat a title, just a name of a little bit sentence that explains the title of the chat, do not give suggestions just one");
            create_chat.title = result.response.text();
            await create_chat.save();
            console.log(result.response.text());
        }

    } catch (err : any) {
        console.log(err.message);
        res.status(500).json({ err : "Internal server error" })
    }
}

