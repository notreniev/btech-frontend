import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectModel } from '../../domains/models/project.model';
import { TaskModel } from '../../domains/models/task.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() project: ProjectModel;
  @Output() updateProject: EventEmitter<ProjectModel> = new EventEmitter<ProjectModel>();
  @Output() removeProject: EventEmitter<ProjectModel> = new EventEmitter<ProjectModel>();

  dones: TaskModel[] = [];
  task: TaskModel = new TaskModel();
  editingProjectTitle = false;
  editingTaskDescription = false;
  showToolTip = false;

  constructor() { 
  }

  ngOnInit(): void {
  }

  addTask(description: string){
    if (!description) return;
    
    const task = new TaskModel();
    task.description = description;

    const hasIt = this.project.tasks.some(task => task.description === description);
    if (!hasIt){
      this.project.tasks.push(task);
      this.task.description = '';
    }
  }

  editTask(task: TaskModel){
    this.editingTaskDescription = true;
    this.task = {...task};
  }

  finishTask(task: TaskModel){
    const hasIt = this.dones.some(taskObj => taskObj._id === task._id);
    if (!hasIt){
      task.finishedAt = new Date();
      this.dones.push(task);
    }
  }

  saveTask(task: TaskModel){
    const index = this.project.tasks.findIndex(taskObj => taskObj._id === task._id);
    if (index > -1){
      this.project.tasks[index] = task;
    }
  }

  removeTask(task: TaskModel){
    const index = this.project.tasks.findIndex(taskObj => taskObj._id === task._id);
    if (index > -1){
      this.project.tasks.splice(index, 1);
    }
  }

  editTitle(){
    this.editingProjectTitle = true;
  }

  save(project: ProjectModel){
    this.updateProject.emit(project);
    this.editingProjectTitle = false;
  }

  remove(project: ProjectModel){
    this.removeProject.emit(project);
  }

  cancel(){
    this.editingProjectTitle = false;
  }

}
