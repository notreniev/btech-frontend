import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ProjectComponent, CardComponent],
  imports: [
    CommonModule,
    FormsModule, 
    IonicModule
  ],
  exports: [ProjectComponent, CardComponent]
})
export class ProjectModule { }
