import mongoose from 'mongoose';
import { ITodo, IUser } from '../../api/interface/interface';

export interface IUserModel extends mongoose.Model<IUserDoc> {
    build(attrs: IUser): IUserDoc;
}

export interface IUserDoc extends mongoose.Document {
    name: string;
    email: string;
    password: string;
}

export interface ITodoModel extends mongoose.Model<ITodoDoc> {
    build(attrs: ITodo): ITodoDoc;
}

export interface ITodoDoc extends mongoose.Document {
    title: string;
    description: string;
    isCompleted: string;
    userId: string;
}