import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { appService } from '../service'; 
import { AddprojectComponent } from './addproject.component';
import { AddProjectRoutingModule } from './addproject-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
//import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [AddProjectRoutingModule, FormsModule, CommonModule, NgbModule.forRoot(), NgbTypeaheadModule.forRoot()],
  declarations: [AddprojectComponent],
  exports: [AddprojectComponent, FormsModule],
  providers: [appService]
})

export class AddProjectModule { 

}