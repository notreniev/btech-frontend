import { TaskModel } from "./task.model";
import { v4 as uuidv4 } from "uuid";

export class ProjectModel{
    _id: string = uuidv4();
    title: string;
    tasks: TaskModel[] = []; 
}