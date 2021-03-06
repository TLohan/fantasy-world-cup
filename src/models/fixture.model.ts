import { Result } from './Result.model';

export class Fixture {

    homeTeamName: string;
    awayTeamName: string;
    goalsHomeTeam: number;
    goalsAwayTeam: number;
    date: Date;
    status: string;

    constructor(jsonFixure: any) {
        this.homeTeamName = jsonFixure.homeTeamName;
        this.awayTeamName = jsonFixure.awayTeamName;
        this.goalsHomeTeam = (jsonFixure['result']['goalsHomeTeam'] == null) ? 0 : jsonFixure['result']['goalsHomeTeam'];
        this.goalsAwayTeam = (jsonFixure['result']['goalsAwayTeam'] == null) ? 0 : jsonFixure['result']['goalsAwayTeam'];
        this.date = new Date(jsonFixure.date);
        this.status = jsonFixure.status;
    }

}
