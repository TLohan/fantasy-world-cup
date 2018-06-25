import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FifaFixture } from 'models/fifa-fixture.model';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class LivescoresService {

    constructor(private http: Http) {}

    getLiveFixtureData(fixture: FifaFixture): Observable<any> {
        const url = `https://api.fifa.com/api/v1/live/football/17/254645/${fixture.IdStage}/${fixture.IdMatch}?language=en-GB`;
        return this.http.get(url).map((response: Response) => {
            response = response.json();
            return response;
        });
    }
}
