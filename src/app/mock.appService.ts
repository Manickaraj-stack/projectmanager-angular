import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
export class appMockService {

    getProjects(): Observable<any[]> {
        //let headers = new Headers({ 'Accept': '*/*', 'Content-Type':'application/json'});
        //let options = new RequestOptions({ headers: headers });
        let obs = new Observable<any>();
        let obj = [{
            ProjectName: '',
            IsSetdate: '',
            StartDate: new Date(),
            EndDate: new Date(),
            ProjectPriority: '10'
        }];
        return obs.pipe(map((data) => { return obj }));
    }
}