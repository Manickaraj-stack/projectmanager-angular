import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';  
import { Headers, RequestOptions } from '@angular/http';
import { Config } from '../env/index';
import { RouterModule , Router } from '@angular/router';
import {User} from '../userlist/user';

@Injectable()
export class appService {

    headers: any = new Headers({ 'Accept': '*/*', 'Content-Type': 'application/json'});
    options: any = new RequestOptions({ headers: this.headers });
    updatetask : any = {};
    
    constructor(private http: Http, private router : Router) {

    } 

    getTasks(): Observable<string[]> {
        return this.http.get(Config.API+ "/api/Tasks", this.options)
                        .map((res: Response) => res.json())
                        .catch(this.handleErrorNoChange.bind(this));
    }

    addTask(inputParam : {}): Observable<string[]> {
        return this.http.post(Config.API+ "/api/Tasks", inputParam, this.options)
                        .map((res: Response) => res.json())
                        .catch(this.handleErrorNoChange.bind(this));
    }

    addParentTask(inputParam : {}): Observable<string[]> {
        return this.http.post(Config.API+ "/api/ParentTasks", inputParam, this.options)
                        .map((res: Response) => res.json())
                        .catch(this.handleErrorNoChange.bind(this));
    }

    editTask(inputParam : {}, taskId : string): Observable<string[]> {
        return this.http.put(Config.API+ "/api/Tasks/" + taskId, inputParam, this.options)
                        .map((res: Response) => res.json())
                        .catch(this.handleErrorNoChange.bind(this));
    }

    deleteTask(taskId : string): Observable<string[]> {
        return this.http.delete(Config.API+ "api/tasks/"+ taskId, this.options)
                        .map((res: Response) => res.json())
                        .catch(this.handleErrorNoChange.bind(this));
    }

    private handleErrorNoChange (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log('Error handleErrorNoChange kytpp-service: ' + error);
        return Observable.throw(errMsg);
    }
    
    addProject(inputParam : {}): Observable<string[]> {
        return this.http.post(Config.API+ "/api/Projects", inputParam, this.options)
                        .map((res: Response) => res.json())
                        .catch(this.handleErrorNoChange.bind(this));
    }

    editProject(inputParam : {}, projectId : string): Observable<string[]> {
        return this.http.put(Config.API+ "/api/Projects/" + projectId, inputParam, this.options)
                        .map((res: Response) => res.json())
                        .catch(this.handleErrorNoChange.bind(this));
    }

    getProjects(): Observable<string[]> {
        return this.http.get(Config.API+ "/api/Projects", this.options)
                        .map((res: Response) => res.json())
                        .catch(this.handleErrorNoChange.bind(this));
    }

    getParenttasks(): Observable<any> {
        return this.http.get(Config.API+ "/api/ParentTasks", this.options)
        .map((res: Response) => res.json())
        .catch(this.handleErrorNoChange.bind(this));
    }

    getUsers(): Observable<any> {
        return this.http.get(`${Config.API}/api/Users`, this.options)
        .map((res: Response) => res.json())
        .catch(this.handleErrorNoChange.bind(this));
    }

    getUser(): Observable<any> {
        return this.http.get(`${Config.API}/api/Users`, this.options)
        .map((res: Response) => res.json())
        .catch(this.handleErrorNoChange.bind(this));
    }

    addUser(user: User) {
        return this.http.post(`${Config.API}/api/Users`, JSON.stringify(user), this.options)
        .map((res: Response) => res.json())
        .catch(this.handleErrorNoChange.bind(this));
    }

    updateUser(user: User) {
        return this.http.put(`${Config.API}/api/Users/` + user.ID, JSON.stringify(user), this.options)
        .map((res: Response) => res.json())
        .catch(this.handleErrorNoChange.bind(this));
    }

    deleteUser(user: User) {
        return this.http.delete(`${Config.API}/api/Users/` + user.ID, this.options)
        .map((res: Response) => res.json())
        .catch(this.handleErrorNoChange.bind(this));
    }
}
