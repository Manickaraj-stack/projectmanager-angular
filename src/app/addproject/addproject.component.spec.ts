import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddprojectComponent } from './addproject.component';
import { appMockService } from '../mock.appService';
import { appService } from '../service';

describe('AddprojectComponent', () => {
  let component: AddprojectComponent;
  let fixture: ComponentFixture<AddprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NgbModule],
      declarations: [AddprojectComponent],
      providers: [{ provide: appService, useClass: appMockService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get projects', () => {
    var allprojects = component.allprojects[0];
    expect(component).toBeTruthy();
    expect(allprojects.ProjectName).toEqual('complete assignments');
  });

  it('should add a new project', () => {
    let project = {
      "ProjectName": 'complete assignments',
      "IsSetdate": true,
      "StartDate": "20/11/2019",
      "EndDate": "15/12/2019",
      "ProjectPriority": 15,
      "ID": 1
    };
    component.addproject(project);
    expect(component.addModalBody).toEqual('Project Added Successfully');
  });

  it('should update the project', () => {
    let project = {
      "ProjectName": 'complete assignments',
      "IsSetdate": true,
      "StartDate": "20/11/2019",
      "EndDate": "15/12/2019",
      "ProjectPriority": 15,
      "ID": 1,
      "ProjectId": 11
    };
    component.flow = "updateproject";
    component.addproject(project);
    expect(component.addModalBody).toEqual('Project updated Successfully');
  });

  it('should construct Date From Service', () => {
    let constructDate = component.constructDateFromService("10/11/2018");
    expect(constructDate.day).toBe(10);
    expect(constructDate.month).toBe(11);
    expect(constructDate.year).toBe(2018);
  });

  it('should reset project', () => {
    component.reset();
    expect(component.project.ProjectName).toBe("");
    expect(component.project.IsSetdate).toBe("");
    expect(component.project.StartDate.toLocaleString()).toEqual(new Date().toLocaleString());
    expect(component.project.EndDate.toLocaleString()).toEqual(new Date().toLocaleString());
    expect(component.project.ProjectPriority).toBe("10");
    expect(component.project.ID).toBe("");
  });

  it('should get users list in pop-up', () => {
    component.openmodal();
    var userslist = component.users[0];
    expect(component).toBeTruthy();
    expect(userslist.FirstName).toEqual('Matt');
  });
});
