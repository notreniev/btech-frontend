import { UserModel } from "../models/user.model";
import { v4 as uuidv4 } from "uuid";

export function getUserMock(){
    const user = new UserModel();
    user._id = uuidv4();
    user.name = "Everton Silva",
    user.email = "everton.canez@gmail.com"

    return user;
}