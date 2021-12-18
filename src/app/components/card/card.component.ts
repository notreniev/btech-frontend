import { Component, Input, OnInit } from '@angular/core';
import { ProjectModel } from '../../domains/models/project.model';
import { TaskModel } from '../../domains/models/task.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() project: ProjectModel;

  dones: TaskModel[] = [];
  task: TaskModel = new TaskModel();

  constructor() { 
  }

  ngOnInit(): void {
    console.log('this.project', this.project)
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

  finish(task: TaskModel){
    const hasIt = this.project.tasks.some(taskObj => taskObj.description === task.description && task.completed);
    if (!hasIt){
      task.completed = true;
      this.dones.push(task);
    }
  }
}
