import { TaskModel } from "./task.model";
import { v4 as uuidv4 } from "uuid";
import { UserModel } from "./user.model";

export class ProjectModel{
    _id: string;
    title: string;
    tasks: TaskModel[] = [];
    done: TaskModel[] = [];
    user: UserModel;

}