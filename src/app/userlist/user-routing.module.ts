import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  AddUserComponent } from './add-user.component';
import {  UserListComponent } from './user-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component:  AddUserComponent},
      { path: 'adduser', component: AddUserComponent },
      { path: 'users', component: UserListComponent }
    ])
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
