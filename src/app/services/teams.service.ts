import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable,  } from 'rxjs/Observable';
import { Team } from 'models/team.model';
import 'rxjs/add/operator/map';

@Injectable()
export class TeamsService {

    teams: Team[];

    constructor(private http: Http) {}

    // tslint:disable-next-line:no-unused-expression
    getTeams(): Observable<Team[]> {
        const url = 'http://api.football-data.org/v1/competitions/467';
        return this.http.get(url).map((response: Response) => {
            this.teams = response.json();
            return response.json();
        });
    }

}
