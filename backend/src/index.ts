import express from "express";
import mongoose from "mongoose";
import routes from "./routes/routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/chatbots");
const db = mongoose.connection;

db.on("error", () : void => console.log("failed to connect to mongodb"));
db.once("open", () => {
    app.listen(8080, () => console.log("server connected to mongodb and running on port 8080"));
    app.use(routes);
});