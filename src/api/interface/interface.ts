/** Description -An interface that describe the properties
 * that are required to create a new User
 */
export interface IUser {
    name: string;
    email: string;
    password: string;
}

/** Description -An interface that describe the properties
 * that are required to create a new Todo
 */
export interface ITodo {
    title: string;
    description: string;
    isCompleted: boolean;
    userId: string;
}