import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddprojectComponent } from './addproject.component';

@NgModule({
  imports: [
    RouterModule.forChild([      
      { path: 'addproject', component: AddprojectComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AddProjectRoutingModule { }