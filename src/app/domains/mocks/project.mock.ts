import { ProjectModel } from "../models/project.model";
import { v4 as uuidv4 } from "uuid";
import { getTasksMock } from "./task.mock";

export function getProjectMock(){
    const project = new ProjectModel();
    project._id = uuidv4();
    project.title = "Project ABC";
    project.tasks = getTasksMock();

    return project;   
}

export function getProjectsMock(){
    const project1 = new ProjectModel();
    project1._id = uuidv4();
    project1.title = "Project ABC";
    project1.tasks = getTasksMock();

    const project2 = new ProjectModel();
    project2._id = uuidv4();
    project2.title = "Project XYZ";
    project2.tasks = getTasksMock();

    const project3 = new ProjectModel();
    project3._id = uuidv4();
    project3.title = "Project DEF";
    project3.tasks = getTasksMock();

    const projects = [project1, project2];
    return projects;
}

