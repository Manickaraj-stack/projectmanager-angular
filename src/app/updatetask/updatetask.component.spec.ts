import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateTaskComponent } from './updatetask.component';
import { appMockService } from '../mock.appService';
import { appService } from '../service';
import { Router, ActivatedRoute } from '@angular/router';

describe('UpdateTaskComponent', () => {
    let component: UpdateTaskComponent;
    let fixture: ComponentFixture<UpdateTaskComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, NgbModule],
            declarations: [UpdateTaskComponent],
            providers: [
                { provide: appService, useClass: appMockService },
                { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UpdateTaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        component.flow = "addtask";
        expect(component).toBeTruthy();
    });

    it('should get tasks', () => {
        //var allprojects = component.allprojects[0];
        expect(component).toBeTruthy();
        //expect(allprojects.ProjectName).toEqual('new project')
    });

    it('should add a new task', () => {
        component.task.IsParentTask = false;
        let task = {
            "ProjectId": 1,
            "ParentId": 10,
            "IsParentTask": false,
            "TaskName": 'complete e-learnings',
            "StartDate": '15/11/2019',
            "EndDate": '15/12/2019',
            "UserId": 2,
            "TaskPriority": 10,
        };
        component.updateTask(task);
        expect(component.modalBody).toEqual('Task Added Successfully');
    });

    it('should construct Date From Service', () => {
        let constructDate = component.constructDateFromService("10/11/2018");
        expect(constructDate.day).toBe(10);
        expect(constructDate.month).toBe(11);
        expect(constructDate.year).toBe(2018);
    });

    it('should get users list in pop-up', () => {
        component.selectuser();
        var userslist = component.users[0];
        expect(component).toBeTruthy();
        expect(userslist.FirstName).toEqual('Matt');
    });

    it('should get projects list in pop-up', () => {
        component.selectproject();
        var projects = component.projects[0];
        expect(component).toBeTruthy();
        expect(projects.ProjectName).toEqual('complete assignments');
    });
});
