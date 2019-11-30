import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { User } from './userlist/user';

export class appMockService {

    updatetask: any = null;

    getProjects(): Observable<any[]> {
        let obj = [{
            ProjectName: 'complete assignments',
            IsSetdate: true,
            StartDate: '10/10/2019',
            EndDate: '10/11/2019',
            ProjectPriority: '10'
        }];

        return new Observable(observer =>
            observer.next(obj)
        );
    }

    addProject(inputParam: {}): Observable<any> {
        let obj = {
            status: 'ok',
            code: 200
        };
        return new Observable(observer =>
            observer.next(obj));
    }

    editProject(inputParam: {}, projectId: string): Observable<any> {
        let obj = {
            status: 'ok'
        };
        return new Observable(observer =>
            observer.next(obj));
    }

    getTasks(): Observable<any[]> {
        let tasks = [{
            "ProjectId": 1,
            "ParentId": 10,
            "IsParentTask": false,
            "TaskName": 'complete e-learnings',
            "StartDate": '15/11/2019',
            "EndDate": '15/12/2019',
            "UserId": 2,
            "TaskPriority": 10,
        }];
        return new Observable(observer =>
            observer.next(tasks));
    }

    addTask(inputParam: {}): Observable<any[]> {
        let tasks = [{
            'status': 'ok'
        }];
        return new Observable(observer =>
            observer.next(tasks));
    }

    editTask(inputParam: {}, taskId: string): Observable<any[]> {
        this.updatetask.TaskId = 1;
        let tasks = [{
            'status': 'ok'
        }];
        return new Observable(observer =>
            observer.next(tasks));
    }

    getUsers(): Observable<any[]> {
        let users = [{
            ID: 1, FirstName: 'Matt'
        },
        {
            ID: 2, FirstName: 'John'
        }];
        return new Observable(observer =>
            observer.next(users));
    }

    addUser(user: User) {
        let obj = {
            status: 'ok',
            code: 200
        };
        return new Observable(observer =>
            observer.next(obj));
    }
}