export class Goal {
    Minute: number;
    IdPlayer: number;
    PlayerName: string;

    constructor(jsonData: any) {
        this.Minute = jsonData.Minute;
        this.IdPlayer = jsonData.IdPlayer;
    }
}
