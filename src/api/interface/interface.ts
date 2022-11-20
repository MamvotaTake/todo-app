export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface ITodo {
    title: string;
    description: string;
    isCompleted: boolean;
    userId: string;
}