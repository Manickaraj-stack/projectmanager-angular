import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { appService } from '../service'; 
import { AddUserComponent } from './add-user.component';
import { UserListComponent } from './user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
    imports: [UserRoutingModule, FormsModule, CommonModule, ReactiveFormsModule],
    declarations: [ UserListComponent, AddUserComponent ],
    exports: [UserListComponent, AddUserComponent],
    providers: [appService]
})
export class UserModule {

}