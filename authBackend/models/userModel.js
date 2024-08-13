import mongoose, { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";

const jwtSecret = "cheen dabak dam dam";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

userSchema.methods.createJWT = function() {
    try {
        return jwt.sign(
            {
                _id: this._id,
                email: this.email,
                username: this.username
            },
            jwtSecret,
            {
                expiresIn: '7d'
            }
        );
    } catch (error) {
        console.error("Error creating JWT:", error);
        throw new Error("Could not generate token");
    }
};



const User = model("users", userSchema);
export default User;
