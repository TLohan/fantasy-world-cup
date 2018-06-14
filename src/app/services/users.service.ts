import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from 'models/user.model';
import { Team } from 'models/team.model';
import { Fixture } from 'models/fixture.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

    constructor(private http: Http){
    }

    getUsers(): Observable<any> {
        const url = 'http://api.football-data.org/v1/competitions/467/fixtures';
        const headers = new Headers();
        headers.append('X-Auth-Token', '69f6a2551e984fa0bc21512e79c8e0ed');
        const fixtures: Fixture[] = [];
        const options = new RequestOptions({headers: headers});
        return this.http.get(url, options).map((response: Response) => {
            const result = response.json();
            return result;
        });
    }




}