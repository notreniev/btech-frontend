import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ProjectModel } from '../../domains/models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {

  @Input() projects: ProjectModel[];

  title: string;
  showHideForm = false;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController) {}

  ngOnInit(): void {
  }

  addProject(title: string){
    const project = new ProjectModel();
    project.title = title;
    
    this.projects.push(project);
    this.title = '';
    this.projects.reverse();
    this.showHideForm = false;
  }

  showHideAddProject(){
    this.showHideForm = !this.showHideForm;
  }

  updateProject(updatedProject: ProjectModel){
    const index = this.projects.findIndex(proj => proj._id === updatedProject._id);

    if(index > -1){
      this.projects[index].title = updatedProject.title;
    }
  }

  async removeProject(removedProject: ProjectModel){
    const indexOf = this.projects.indexOf(removedProject);

    if(indexOf > -1){
      const alert = await this.removeWithConfirmation();
      if (alert.role === 'ok'){
        this.projects.splice(indexOf, 1);
        this.presentFeedback('Project removed successfully!');
      }
    }
  }

  async removeWithConfirmation() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Removing Project',
      message: 'Are you sure?',
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
    
    async presentFeedback(message: string) {
      const toast = await this.toastController.create({
        message,
        color: 'success',
        cssClass: 'ion-text-center',
        animated: true,
        duration: 3000
      });
      toast.present();
    }

}
