import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
export class appMockService {

    getProjects(): Observable<any[]> {
        let obj = [{
            ProjectName: 'new project',
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
}