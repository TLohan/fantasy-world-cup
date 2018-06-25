import { Team } from './team.model';

export class Group {
    name: string;
    teamNames: string[];
    teams: Team[] = [];

    constructor(name: string, teamNames: string[]) {
        this.name = name;
        this.teamNames = teamNames;
    }

    addTeam(team: Team) {
        this.teams.push(team);
    }
}
