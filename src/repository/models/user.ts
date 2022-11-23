import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../../api/interface/interface";
import { Password } from "../../utils/password";
import { IUserDoc, IUserModel } from "../interface/interface";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

/**
 * Description
 * @param {any} 'save'
 * @param {any} asyncfunction(next)
 * 
 */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12)

    next();
})

/**
 * Creating user passed attributes
 * @param {IUser} attrs
 * @returns {User}
 */
userSchema.statics.build = (attrs: IUser) => {
    return new User(attrs);
}

const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema);

export { User };