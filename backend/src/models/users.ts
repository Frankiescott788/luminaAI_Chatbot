import {model, Schema} from "mongoose";
import {User} from "../types/types";
import {isEmail} from "validator";
import bcrypt from "bcrypt";

const userSchema = new Schema<User>({
    user_id : {
        type : String,
        required : true,
        unique : true
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate : [isEmail, "Please enter a valid email"]
    },
    password : {
        type : String,
        required : true,
        minLength : [6, "Password must minimum of 6 characters"]
    }
}, { timestamps : true });

userSchema.pre("save", async function(next) {
    try {
        this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
        next();
    } catch (err: any) {
        console.log(err.message);
        return next(err);
    }
});

const User = model("users", userSchema);

export default User

