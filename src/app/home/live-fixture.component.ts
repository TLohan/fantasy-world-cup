import { Component, Input, OnInit } from '@angular/core';
import { FifaFixture } from 'models/fifa-fixture.model';
import { LivescoresService } from '../services/livescore.service';
import { Player } from 'models/player.model';
import { Goal } from 'models/goal.model';

@Component({
    selector: 'app-live-fixture',
    templateUrl: 'live-fixture.component.html',
    styleUrls: ['fifa-data.component.scss']
})
export class LiveFixtureComponent implements OnInit {
    private _fixture: FifaFixture;

    @Input() fixture: FifaFixture = new FifaFixture(null);

    constructor(private livescoreService: LivescoresService) {}

    ngOnInit() {
        console.log(this.fixture.AwayTeamName);
        console.log(this.fixture.MatchStatus);

        this.livescoreService.getLiveFixtureData(this.fixture).subscribe(data => {
            const homeTeamPlayersData = data.HomeTeam.Players;
            const awayTeamPlayers = data.AwayTeam.Players;
            const homeGoalsData = data.HomeTeam.Goals;
            const awayGoalsData = data.AwayTeam.Goals;
            const players: Player[] = [];
            const homeGoals: Goal[] = [];
            const awayGoals: Goal[] = [];

            this.fixture.MatchTime = data.MatchTime;

            homeTeamPlayersData.forEach(player => {
                players.push(new Player(player));
            });

            awayTeamPlayers.forEach(player => {
                players.push(new Player(player));
            });

            homeGoalsData.forEach(goal => {
                const gol = new Goal(goal);
                gol.PlayerName = players.find(function (player) { return player.IdPlayer === goal.IdPlayer; }).Name;
                homeGoals.push(gol);
            });

            awayGoalsData.forEach(goal => {
                const gol = new Goal(goal);
                gol.PlayerName = players.find(function (player) { return player.IdPlayer === goal.IdPlayer; }).Name;
                awayGoals.push(gol);
            });
            this.fixture.HomeGoals = homeGoals;
            this.fixture.AwayGoals = awayGoals;
        });
    }

}
