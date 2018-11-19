import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Fixture } from 'models/fixture.model';
import { FifaFixture, MatchStatus } from 'models/fifa-fixture.model';
import { User } from 'models/user.model';
import { DateFixture } from 'models/date-fixture.model';

@Component({
    templateUrl: 'fifa-data.component.html',
    selector: 'app-fifa-data',
})
export class FifaDataComponent implements OnInit {
    users: User[];
    fixtures: Fixture[] = [];
    dateFixtures: DateFixture[] = [];
    todaysFixtures: FifaFixture[] = [];

    fixtureMode = false;

    constructor(private usersService: UsersService) {
        this.users = [
            new User('Tom', ['England', 'Uruguay', 'Nigeria', 'Korea Republic']),
            new User('Mark', ['Spain', 'Switzerland', 'Egypt', 'Tunisia']),
            new User('Marc', ['Argentina', 'Croatia', 'Sweden', 'IR Iran']),
            new User('Daragh', ['Brazil', 'Russia', 'Serbia', 'Panama']),
            new User('Gav', ['France', 'Denmark', 'Iceland', 'Australia']),
            new User('Ciaran', ['Portugal', 'Poland', 'Senegal', 'Saudi Arabia']),
            new User('Romano', ['Germany', 'Mexico', 'Morocco', 'Japan']),
            new User('Dave', ['Belgium', 'Colombia', 'Peru', 'Costa Rica']),
          ];
    }

    ngOnInit(): void {
        const fixtures: FifaFixture[] = [];
        const dateFixtures: DateFixture[] = [];


        const dates: string[] = [];
        this.usersService.getFifaMatchesData().subscribe(data => {
            data.Results.forEach(result => {
                const fixture = new FifaFixture(result);
                fixtures.push(fixture);
            });

            fixtures.forEach(fixture => {
                if (fixture.Date.toString().split('2018')[0] === new Date(Date.now()).toString().split('2018')[0]) {
                    this.todaysFixtures.push(fixture);
                }

                for (let index = 0; index < this.users.length; index++) {
                    const user = this.users[index];

                    if (user.teamsNames.indexOf(fixture.HomeTeamName) !== -1) {
                        const potNo = user.teamsNames.indexOf(fixture.HomeTeamName);
                        
                        let awayPotNo = 0;
                        
                        this.users.forEach(u => {
                            if (u.teamsNames.indexOf(fixture.AwayTeamName) !== -1) {
                                awayPotNo = 1 + u.teamsNames.indexOf(fixture.AwayTeamName);
                            }
                        });
                        console.log(awayPotNo);
                        
                        user.negative_points += (awayPotNo * fixture.GoalsAwayTeam);
                        user.teams[potNo].increaseGoals(fixture.GoalsHomeTeam);
                    }

                    if (user.teamsNames.indexOf(fixture.AwayTeamName) !== -1) {
                        const potNo = user.teamsNames.indexOf(fixture.AwayTeamName);
                        let homePotNo = 0;

                        this.users.forEach(u => {
                            if (u.teamsNames.indexOf(fixture.HomeTeamName) !== -1) {
                                homePotNo = 1 + u.teamsNames.indexOf(fixture.HomeTeamName);
                            }
                        })
                        console.log(homePotNo);
                        
                        user.negative_points += (homePotNo * fixture.GoalsHomeTeam);
                        user.teams[potNo].increaseGoals(fixture.GoalsAwayTeam);
                    }

                }

                const dateIndex = dates.indexOf(fixture.Date.toDateString());

                if (dateIndex !== -1) {
                  dateFixtures[dateIndex].addFifaFixture(fixture);
                } else {
                  dates.push(fixture.Date.toDateString());
                  const df = new DateFixture(fixture.Date);
                  df.addFifaFixture(fixture);
                  dateFixtures.push(df);
                }

            });
            this.users = this.users.sort(sortByTotalPoints);
            this.dateFixtures = dateFixtures;
            this.dateFixtures = dateFixtures;
        });
    }

    isLiveFixture(status: MatchStatus): boolean {
        return status === MatchStatus.LIVE;
    }

    isPastFixture(status: MatchStatus): boolean {
        return status === MatchStatus.PAST;
    }

    isFutureFixture(status: MatchStatus): boolean {
        return status === MatchStatus.FUTURE;
    }


}
function sortByTotalPoints(u1: User, u2: User): number {
    const u1tp = u1.totalPoints - u1.negative_points;
    const u2tp = u2.totalPoints - u2.negative_points;
    if (u1tp < u2tp) {
      return 1;
    } else if (u1.totalPoints === u2.totalPoints) {
        if (u1.totalGoals < u2.totalGoals) {
            return 1;
        } else if (u1.totalGoals === u2.totalGoals) {
            for (let index = u1.teams.length - 1; index >= 0; index--) {
                if (u1.teams[index].goals < u2.teams[index].goals) {
                    return 1;
                }
            }
        }
        return 0;
    }
    return -1;
}
