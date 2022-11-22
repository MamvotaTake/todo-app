import mongoose from 'mongoose';
import { ITodoDoc, ITodoModel } from '../interface/interface';

const todoSchema = new mongoose.Schema({ 

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: String,
        require: true
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
            delete ret.__v;
        }
    }
});

todoSchema.statics.build = (attrs) => {
    return new Todo(attrs);
}

const Todo = mongoose.model<ITodoDoc, ITodoModel>('Todo', todoSchema);

export {Todo};