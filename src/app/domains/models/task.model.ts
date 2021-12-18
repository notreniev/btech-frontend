import { v4 as uuidv4 } from "uuid";

export class TaskModel{
    _id: string = uuidv4();
    description: string;
    createdAt: Date;
    finishedAt: Date;
    completed: boolean;
}
