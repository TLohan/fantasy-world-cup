import { User } from './user.model';

export class Team {

    name: string;
    pot: number;
    goals = 0;
    crestUrl: string;
    private _points = 0;
    groupWins: number;
    groupLosses: number;
    groupDraws: number;
    goalAgainst: number;

    constructor(name: string, pot: number) {
        this.name = name;
        this.pot = pot;
    }

    increaseGoals(amount: number) {
        this.goals += amount;
    }

    get points(): number {
        return this.goals * this.pot;
    }

}
