import mongoose from 'mongoose';
import { ITodoDoc, ITodoModel } from '../interface/interface';

const todoSchema = new mongoose.Schema({ 

    title: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    isCompleted: {
        type: 'boolean',
        default: false,
    },
    userId: {
        type: 'string',
        require: true
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

todoSchema.statics.build = (attrs) => {
    return new Todo(attrs);
}

const Todo = mongoose.model<ITodoDoc, ITodoModel>('Todo', todoSchema);

export {Todo};