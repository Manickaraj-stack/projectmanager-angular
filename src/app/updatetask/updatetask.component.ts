import { Component, OnInit, Inject, ViewEncapsulation, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent,
  NgbDatepicker, NgbDatepickerConfig, NgbDate, NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge} from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { appService } from '../service';
declare var jQuery: any;

@Component({

  selector: 'app-updatetask',
  templateUrl: 'updatetask.component.html',
  styleUrls: ['updatetask.component.css']
})
export class UpdateTaskComponent implements OnInit, OnDestroy {

  //@ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  task: any = {};
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  calendarToday: NgbCalendar;
  alltaskList: any = [];
  errorShow = false;
  screenLoader = false;
  errorMessage = '';
  modalHeading = '';
  modalBody = '';
  flow = 'addtask';
  selectedParentTaskObj: any = {};
  projects: any = [];
  parenttasks: any = [];
  users: any = [];

  constructor(calendar: NgbCalendar, config: NgbDatepickerConfig, public router: Router, private appService : appService) {
    this.calendarToday = calendar;
    if (this.appService.updatetask !== null){
      this.flow = 'updatetask';
    }
    if (this.flow === 'addtask') {
      this.task = {
        TaskName: '',
        TaskPriority: '15',
        StartDate: new Date(),
        EndDate: new Date(),
        IsParentTask:false,
        ParentId: '',
        UserId: '',
        ProjectId:''
      };
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }

    if(this.flow === 'updatetask'){
      var edittask = this.appService.updatetask;
      this.selectedParentTaskObj = edittask.parentTask !== null ? edittask.parentTask : null;
      this.task = {
        "TaskName":edittask.TaskName,
        "TaskPriority":edittask.TaskPriority,
        "ParentId":edittask.ParentId,
        "ProjectId": edittask.ProjectId,
        "UserId": edittask.UserId,
        "ParentTaskName":edittask.ParentTaskName,
        "ProjectName":edittask.ProjectName,
        "UserName":edittask.UserName,
        "StartDate":new Date(),
        "EndDate":new Date(),
        "IsParentTask": edittask.IsParentTask        
      };
      this.fromDate = NgbDate.from(this.constructDateFromService(edittask.StartDate));
      this.toDate = NgbDate.from(this.constructDateFromService(edittask.EndDate));
    }

    const currentDate = new Date();
    config.minDate = {year:currentDate.getFullYear(), month:currentDate.getMonth()+1, day: currentDate.getDate()};
    config.maxDate = {year: 2099, month: 12, day: 31};
    config.outsideDays = 'hidden';
  }

  IsparentTask(task: any){
    this.task = {
        IsParentTask: task.IsParentTask,
        TaskPriority: '15',
        ParentId: '',
        StartDate: new Date(),
        EndDate: new Date(),
        UserId:''
      };
      jQuery("#project").val('');
      jQuery("#parenttask").val('');
      jQuery("#user").val('');
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.task = {};
  }

  //formatter = (value: any) => value.parentTask.parentTaskName || '';

  updateTask(task: any){
    var parentTaskNameVal = jQuery("#parentTask").val();
    this.errorShow = false;
    this.errorMessage = '';
    if(parentTaskNameVal !== '' && this.task.parentTaskId === ''){
      this.errorShow = true;
      this.errorMessage = 'Select Parent Task from the list available. Either the task name is edited or you have typed a custom task name.';
    }else{
      if(this.flow === 'addtask'){
        var submitAddTask = {};
        var submitParentTask = {};
        if(!this.task.IsParentTask){
          submitAddTask = {
            "ProjectId": this.task.ProjectId,
            "ParentId": this.task.ParentId,
            "IsParentTask": this.task.IsParentTask,
            "TaskName":this.task.TaskName,
            "StartDate": this.convertDateJsonToString(this.fromDate),
            "EndDate": this.convertDateJsonToString(this.toDate),
            "UserId": this.task.UserId,
            "TaskPriority": this.task.TaskPriority,
          };

          this.screenLoader = true;
        this.appService.addTask(submitAddTask).subscribe(
          (data: any) => {
            this.screenLoader = false;
            this.modalHeading = 'Yeah :-)';
            this.modalBody = 'Task Added Successfully';
            document.getElementById("submitModalOpener").click();
          },
          (err: any) => {
              this.screenLoader = false;
              this.modalHeading = 'Oh No !!!';
              this.modalBody = 'Unexpected error occured during Add Task. Please try after some time.';
              document.getElementById("submitModalOpener").click();        
            }
          );
        }else{
          submitParentTask = {
            "ParentTask1": this.task.TaskName
          };

          this.appService.addParentTask(submitParentTask).subscribe(
            (data: any) => {
              this.modalHeading = 'Yeah :-)';
              this.modalBody = 'Parent task Added Successfully';
              document.getElementById("submitModalOpener").click();
            },
            (err: any) => {
                this.modalHeading = 'Oh No !!!';
                this.modalBody = 'Unexpected error occured during Add Task. Please try after some time.';
                document.getElementById("submitModalOpener").click();        
              }
            );
        }
      }
      if(this.flow === 'updatetask'){
        var submitUpdateTask = {
          "ProjectId": this.task.ProjectId,
          "ParentId": this.task.ParentId,
          "IsParentTask": this.task.IsParentTask,
          "TaskName":this.task.TaskName,
          "StartDate": this.convertDateJsonToString(this.fromDate),
          "EndDate": this.convertDateJsonToString(this.toDate),
          "UserId": this.task.UserId,
          "TaskPriority": this.task.TaskPriority,
          "TaskId": this.appService.updatetask.TaskId
        };
        this.screenLoader = true;
        this.appService.editTask(submitUpdateTask, this.appService.updatetask.TaskId).subscribe(
          (data: any) => {
            this.screenLoader = false;
            this.modalHeading = 'Yeah :-)';
            this.modalBody = 'Task Updated Successfully';
            document.getElementById("submitModalOpener").click();
          },
          (err: any) => {
              this.screenLoader = false;
              this.modalHeading = 'Oh No !!!';
              this.modalBody = 'Unexpected error occured during Update Task. Please try after some time.';
              document.getElementById("submitModalOpener").click();        
            }
          );
      }
    }
  }

  selectproject(){
    this.appService.getProjects().subscribe(
      (data: any) => {
        this.projects = data;
      });
  }

  getselectedproject(event, project: any){
    var value = event.target.textContent;
    jQuery("#project").val(value);
    this.task.ProjectId = project.ProjectId;
    this.task.ProjectName = value;
}

selectparenttask(){
  this.appService.getParenttasks().subscribe(
    (data: any) => {
      this.parenttasks = data;
    });
}

getselectedparent(event, parent: any){
  var value = event.target.textContent;
  jQuery("#parenttask").val(value);
  this.task.ParentId = parent.ParentId;
}

getselecteduser(event, user: any){
  var value = event.target.textContent;
  jQuery("#user").val(value);
  this.task.UserId = user.ID;
}

selectuser(){
this.modalHeading = "Users list";
this.appService.getUsers().subscribe(
  (data: any) => {
    this.users = data;
  });    
};

  constructDateFromService(datestring: string){
    var res = datestring.split("/");
    const date: NgbDateStruct = { day: parseInt(res[0]), month: parseInt(res[1]), year: parseInt(res[2]) };
    return date;
  }

  resetButton(){
    this.task = {
      "taskName":"",
      "priority":"15",
      "parentTaskId":"",
      "parentTaskName":"",
      "startDate":new Date(),
      "endDate":new Date()
    };
    this.fromDate = this.calendarToday.getToday();
    this.toDate = this.calendarToday.getNext(this.calendarToday.getToday(), 'd', 10);
    jQuery("#project").val('');
    jQuery("#parenttask").val('');
    jQuery("#user").val('');
  }
  
  viewTaskScreen(){
    document.getElementById("view-task").click();
  }

  /* Datepicker functions*/
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  convertDateJsonToString(json: any){
    if(json !== undefined && json !== null){
      return json.day + '/' + json.month + '/' + json.year;
    }
  }
}



