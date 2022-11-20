import mongoose from "mongoose";
import { IUser } from "../../api/interface/interface";
import { IUserDoc, IUserModel } from "../interface/interface";

const userSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

userSchema.statics.build = (attrs: IUser) => {
    return new User(attrs);
}

const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema);

export { User };