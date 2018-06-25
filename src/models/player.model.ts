export class Player {
    Name: string;
    IdPlayer: number;

    constructor(jsonData: any) {
        this.Name = jsonData.PlayerName[0].Description;
        this.IdPlayer = jsonData.IdPlayer;
    }
}
