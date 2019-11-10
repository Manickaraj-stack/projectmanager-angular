import {Component, OnInit, Inject, ViewEncapsulation, OnDestroy, ViewChild, Input} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable, Subject, merge} from 'rxjs';
import { appService } from '../service/app.service'; 
import { User } from './user';
import {concatMap} from 'rxjs/operators';
declare var jQuery: any;

@Component({
    selector: "add-user-component",
    templateUrl: "./add-user.component.html"
})
export class AddUserComponent implements OnInit {
    userForm: FormGroup;
    users: User;
    showEdit: boolean;

    constructor(private fb: FormBuilder, private readonly appservice: appService) {
        
    }
    ngOnInit(): void {
        this.initForm();
        this.showEdit = false;
    }
    submitForm(): void {
        console.log(this.userForm.value);
        this.appservice.addUser(this.userForm.value).pipe(
            concatMap(() => this.getUsers())
        ).subscribe(data => { this.users = data; this.initForm(); });
    }
    getUsers() {
        return this.appservice.getUsers();
    }
    resetForm(): void {
        this.initForm();
    }
    initForm(): void {
        this.userForm = this.fb.group({
            'FirstName': ['', Validators.required],
            'LastName': ['', Validators.required],
            'ID': ['', Validators.required]
        });
        this.showEdit = false;
        jQuery("#userid").attr("enabled", "enabled");
    }

    showUserDetails(userData: any){
        this.showEdit = true;
        jQuery("#userid").attr("disabled", "disabled");
        this.userForm.patchValue({
            FirstName: userData.FirstName,
            LastName: userData.LastName,
            ID: userData.ID
        });
    }

    updateData() {
        this.appservice.updateUser(this.userForm.value).pipe(
            concatMap(() => this.getUsers())
        ).subscribe(data => { 
            this.users = data;
            this.initForm();
        });
    }
}

