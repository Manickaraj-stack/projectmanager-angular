import {Component, OnInit, Inject, ViewEncapsulation, OnDestroy, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable, Subject, merge} from 'rxjs';
import { User } from './user';
import { appService } from '../service';
import { concatMap } from 'rxjs/operators';


@Component({
    selector: "user-list",
    templateUrl: "./user-list.component.html"
})
export class UserListComponent implements OnInit {
    @Input()
    users: User[];

    @Output() emitUserDetails = new EventEmitter(); // Output Event for sending the user's data

    constructor(private readonly appservice: appService){

    }

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.appservice.getUsers()
            .subscribe(users => {
                this.users = users;
            });
    }

    getUsers() {
        return this.appservice.getUsers();
    }

    editUser(editValues: any) {
        this.emitUserDetails.emit(editValues);
    }

    deleteUser(deleteValues: any) {
        this.appservice.deleteUser(deleteValues).pipe(
            concatMap(() => this.getUsers())
        ).subscribe(data => { 
            this.users = data;
            this.loadUsers();
        });
    }
}