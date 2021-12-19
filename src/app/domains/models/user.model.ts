import { v4 as uuidv4 } from "uuid";

export class UserModel{
    _id: string = uuidv4();
    name: string;
    birthday: Date;
    username: string;
    email: string;
    password?: string;
}