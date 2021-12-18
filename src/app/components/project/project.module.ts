import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CardFormComponent } from '../card-form/card-form.component';



@NgModule({
  declarations: [ProjectComponent, CardComponent, CardFormComponent],
  imports: [
    CommonModule,
    FormsModule, 
    IonicModule
  ],
  exports: [ProjectComponent, CardComponent, CardFormComponent]
})
export class ProjectModule { }
