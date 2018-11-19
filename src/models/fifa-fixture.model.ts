import { Goal } from './goal.model';

export class FifaFixture {
    IdCompetition: number;
    IdSeason: number;
    IdStage: number;
    IdGroup: number;
    IdMatch: number;
    GroupName: string;
    Date: Date;
    MatchStatus: MatchStatus;
    HomeTeamName: string;
    GoalsHomeTeam: number;

    AwayTeamName: string;
    GoalsAwayTeam: number;

    MatchTime: number;

    HomeGoals: Goal[] = [];
    AwayGoals: Goal[] = [];
    constructor(jsonData: any) {
        if (jsonData !== null) {

            this.IdCompetition = jsonData.IdCompetition;
            this.IdSeason = jsonData.IdSeason;
            this.IdStage = jsonData.IdStage;
            this.IdMatch = jsonData.IdMatch;
            this.GroupName = (jsonData.GroupName[0] === undefined) ? '' : jsonData.GroupName[0].Description;

            this.Date = new Date(jsonData.Date);
            this.MatchStatus = this.setMatchStatus(jsonData.MatchStatus);
            console.log(this.MatchStatus);

            this.MatchTime = jsonData.MatchTime || 0;

            if (jsonData.Home !== null) {
                this.HomeTeamName = jsonData.Home.TeamName[0].Description;
                this.GoalsHomeTeam = jsonData.Home.Score;
            } else {
                this.HomeTeamName = '';
                this.GoalsAwayTeam = 0;
            }

            if (jsonData.Away !== null) {
                this.AwayTeamName = jsonData.Away.TeamName[0].Description;
                this.GoalsAwayTeam = jsonData.Away.Score;
            } else {
                this.AwayTeamName = '';
                this.GoalsAwayTeam = 0;
            }
        }
    }

    private setMatchStatus(value: number): MatchStatus {
        switch (value) {
            case 1: return MatchStatus.FUTURE;
            case 0: return MatchStatus.PAST;
            case 3: return MatchStatus.LIVE;
            case 12: return MatchStatus.FUTURE;
            default: return MatchStatus.FUTURE;
        }
    }
}

export enum MatchStatus {
    LIVE,
    PAST,
    FUTURE
}
