import { Team } from './team.model';

export class User {
    name: string;
    teamsNames: string[];
    private _totalPoints: number;
    teams: Team[] = [];

    constructor(name: string, teamsNames: string[]) {
        this.name = name;
        this.teamsNames = teamsNames;
        for (let index = 0; index < teamsNames.length; index++) {
            this.teams[index] = new Team(teamsNames[index], index + 1);
        }
    }

    get totalPoints(): number {
        let points = 0;
        this.teams.forEach(team => {
            points += team.points;
        });
        return points;
    }

    toString(): string {
        let response = '';
        response += this.name + '\n';
        this.teams.forEach(team => {
            response += team.name + team.points + '\n';
        });
        response += this.totalPoints + '\n';
        return response;
    }
}

