import {Request, Response} from "express";
import {User} from "../types/types";
import Users from "../models/users";
import {v4} from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function ValidationErrors(err: any) {

    const errMsg: User = {
        user_id: "",
        username: "",
        email: "",
        password: ""
    }

    if (err.message.includes("users validation failed")) {
        Object.values(err.errors).forEach((error: any) => {
            if (error.properties.path === "user_id") {
                errMsg.user_id = error.properties.message;
            }
            if (error.properties.path === "username") {
                errMsg.username = error.properties.message;
            }
            if (error.properties.path === "email") {
                errMsg.email = error.properties.message;
            }
            if (error.properties.path === "password") {
                errMsg.password = error.properties.message;
            }
        });
    }

    if(err.code === 11000) {
        errMsg.email = "This email is already in use"
    }

    return errMsg
}

export const signUp = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, email, password }: User = req.body;

        let user_fields = {
            username: "",
            email: "",
            password: ""
        };

        if (!username || !email || !password) {
            user_fields = {
                username: !username ? "Username is required" : "",
                email: !email ? "Email is required" : "",
                password: !password ? "Password is required" : ""
            };
            return res.status(400).json(user_fields);
        }

        const newuser: User = await Users.create({
            user_id: v4(),
            username,
            email,
            password
        });

        const token = jwt.sign({user_id : newuser.user_id }, "test123", {
            expiresIn : "7d",
        });

        res.cookie("root", token, { maxAge: 7 * 24 * 60 * 60 * 1000  });

        res.status(201).json({
            message: "Account created",
            newuser,
            token
        })

    } catch (err: any) {
        res.status(400).json({ validation : ValidationErrors(err) })
        console.log(err.message);
    }
}

export const signIn = async (req : Request, res : Response): Promise<any> => {
    try {
        const { email, password } : User = req.body;

        const findEmail = await Users.findOne({ email });

        if (!findEmail) {
            return res.status(404).json({ err_msg : "No email found" });
        }

        const comparePasswords = await bcrypt.compare(password, findEmail.password);

        if (!comparePasswords){
            return res.status(400).json({ err_msg : "Wrong password" })
        }

        const token = jwt.sign({user_id : findEmail.user_id }, "test123", {
            expiresIn : "7d",
        });
        res.cookie("root", token, { maxAge: 7 * 24 * 60 * 60 * 1000  });
        res.status(200).json({ 
            message : "user signed up",
            data : findEmail,
            token
        })
    } catch (e : any) {
        console.log(e.message);
        res.status(500).json({
            err : "internal server error",
            details : e.message
        })
    }
}

export const getcurrentUser = async (req : Request, res : Response) : Promise<any> => {
    try {
        const user = await Users.findOne({ user_id : req.userid }).select("-password")
        if(!user) {
            return res.status(404).json({err_msg : "This user does not exist in our system"});
        }
        res.status(200).json(user)
    } catch (e : any) {
        console.log(e.message);
        res.status(500).json({
            err : "internal server error",
            details : e.message
        })
    }
}