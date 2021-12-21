import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProjectModel } from '../../domains/models/project.model';
import { TaskModel } from '../../domains/models/task.model';
import { ProjectService } from '../../services/project.service';

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

  constructor(
    private alertController: AlertController, 
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.removeFinishedAtFromTasks();
  }

  async addTask(description: string){
    if (!description) return;
    
    const task = new TaskModel();
    task.description = description;

    const hasIt = this.project.tasks.some(task => task.description === description);
    if (hasIt){
      const alert = await this.presentConfirmation('Task\'s already on the list', 'Confirm?');
      if (alert.role != 'ok'){
        return;
      }
    }

    this.project.tasks.push(task);
    await this.projectService
    .update(this.project)
    .toPromise();  
    
    this.task.description = '';
  }

  editTask(task: TaskModel){
    this.editingTaskDescription = true;
    this.task = {...task};
  }

  async finishTask(task: TaskModel){
    const hasIt = this.project.done.some(taskObj => taskObj._id === task._id);

    if (!hasIt){
      task.finishedAt = new Date();
      this.project.done.push(task);
      await this.projectService
      .update(this.project)
      .toPromise();
    }
  }

  /**
   * Set to completed to set list's state on the
   * original tasks list
   */
  removeFinishedAtFromTasks(){
    this.project.tasks.forEach(task => task.completed = false);
  }

  async saveTask(task: TaskModel){
    const index = this.project.tasks.findIndex(taskObj => taskObj._id === task._id);
    if (index > -1){
      this.project.tasks[index] = task;
      await this.projectService
      .update(this.project)
      .toPromise();
    }

    this.task = new TaskModel();
  }

  async removeTask(task: TaskModel){
    const alert = await this.presentConfirmation('Removing Task', 'Are you sure?');
    
    if (alert.role === 'ok') {
      const index = this.project.tasks.findIndex(taskObj => taskObj._id === task._id);
      if (index > -1){
        this.project.tasks.splice(index, 1);
        await this.projectService
        .update(this.project)
        .toPromise();
      }
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


  async presentConfirmation(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes',
          role: 'ok'
        }
      ]
    });

    await alert.present();
    const role = alert.onDidDismiss();

    return role;
  }

}
