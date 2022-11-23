import mongoose from 'mongoose';
import { ITodo, IUser } from '../../api/interface/interface';

/** Description - An interfaces that describes the properties
*that a model has
*/
export interface ITodoModel extends mongoose.Model<ITodoDoc> {
    build(attrs: ITodo): ITodoDoc;
}

export interface IUserModel extends mongoose.Model<IUserDoc> {
    build(attrs: IUser): IUserDoc;
}

/**interfaces that describe the properties 
*that a Document has
*/
export interface IUserDoc extends mongoose.Document {
    name: string;
    email: string;
    password: string;
}

export interface ITodoDoc extends mongoose.Document {
    title: string;
    description: string;
    isCompleted: string;
    userId: string;
}