import { Router } from "express";
import Chat from "../controllers/chatbot";
import {getChat, getUserChats} from "../controllers/chatbotChats";
import {getcurrentUser, signIn, signUp} from "../controllers/users";
import useAuth from "../middlewares/useAuth";

const routes = Router();

routes.post("/api/signup", signUp);
routes.post("/api/signin", signIn);
routes.get("/api/currentuser", useAuth ,getcurrentUser);

routes.post("/api/newchat", useAuth , Chat);
routes.get("/api/chats", useAuth, getUserChats);
routes.post("/api/chats/:chatid", useAuth ,getChat);

export default routes;