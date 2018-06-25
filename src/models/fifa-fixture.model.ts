import { Goal } from './goal.model';

export class FifaFixture {
    IdCompetition: number;
    IdSeason: number;
    IdStage: number;
    IdGroup: number;
    IdMatch: number;
    GroupName: string;
    Date: Date;
    MatchStatus: number;
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
            this.GroupName = (jsonData.GroupName[0] !== undefined) ? jsonData.GroupName[0].Description : '';
            this.Date = new Date(jsonData.Date);
            this.MatchStatus = jsonData.MatchStatus;
            this.MatchTime = jsonData.MatchTime || 0;

            if (jsonData.Home !== null && jsonData.Home !== undefined) {
                this.HomeTeamName = jsonData.Home.TeamName[0].Description;
                this.GoalsHomeTeam = jsonData.Home.Score;
            } else {
                this.HomeTeamName = '';
                this.GoalsAwayTeam = 0;
            }

            if (jsonData.Away !== null && jsonData.Away !== undefined) {
                this.AwayTeamName = jsonData.Away.TeamName[0].Description;
                this.GoalsAwayTeam = jsonData.Away.Score;
            } else {
                this.AwayTeamName = '';
                this.GoalsAwayTeam = 0;
            }
        }
    }
}
