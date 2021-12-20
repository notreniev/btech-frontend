import { TaskModel } from "./task.model";
import { UserModel } from "./user.model";

export class ProjectModel{
    _id: string;
    title: string;
    tasks: TaskModel[] = [];
    done: TaskModel[] = [];
    user: UserModel;
    createdAt: Date = new Date();

}