import { Component, OnInit } from '@angular/core';
import { User } from 'models/user.model';
import { UsersService } from '../services/users.service';
import { Fixture } from 'models/fixture.model';
import { Group } from 'models/group.model';
import { FifaFixture } from 'models/fifa-fixture.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[];
  groups: Group[];
  todaysFixtures: Fixture[] = [];
  dateFixtures: DateFixture[] = [];

  fixtureMode = false;

  constructor(private usersService: UsersService) {
    this.users = [
      new User('Tom', ['England', 'Uruguay', 'Nigeria', 'Korea Republic']),
      new User('Mark', ['Spain', 'Switzerland', 'Egypt', 'Tunisia']),
      new User('Marc', ['Argentina', 'Croatia', 'Sweden', 'Iran']),
      new User('Daragh', ['Brazil', 'Russia', 'Serbia', 'Panama']),
      new User('Gav', ['France', 'Denmark', 'Iceland', 'Australia']),
      new User('Ciaran', ['Portugal', 'Poland', 'Senegal', 'Saudi Arabia']),
      new User('Romano', ['Germany', 'Mexico', 'Morocco', 'Japan']),
      new User('Dave', ['Belgium', 'Colombia', 'Peru', 'Costa Rica']),
    ];

    this.groups = [
      new Group('A', ['Russia', 'Egypt', 'Uruguay', 'Saudi Arabia']),
      new Group('B', ['Spain', 'Portugal', 'Iran', 'Morocco']),
      new Group('C', ['France', 'Denmark', 'Australia', 'Peru']),
      new Group('D', ['Argentina', 'Iceland', 'Croatia', 'Nigeria']),
      new Group('E', ['Brazil', 'Switzerland', 'Costa Rica', 'Serbia']),
      new Group('F', ['Germany', 'Mexico', 'Sweden', 'South Korea']),
      new Group('G', ['England', 'Belgium', 'Tunisia', 'Panama']),
      new Group('H', ['Poland', 'Senegal', 'Colombia', 'Japan'])
    ];
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe(result => {
      const fixtures: Fixture[] = [];
      const dateFixtures: DateFixture[] = [];
      const dates: string[] = [];
      for (let index = 0; index < result['count']; index++) {
        const fixtureJson = result['fixtures'][index];
        fixtures[index] = new Fixture(fixtureJson);
      }
      fixtures.forEach(fixture => {
          if (fixture.date.toString().split('2018')[0] === new Date(Date.now()).toString().split('2018')[0]) {
            this.todaysFixtures.push(fixture);
          }
          for (let index = 0; index < this.users.length; index++) {
              const user = this.users[index];

              if (user.teamsNames.indexOf(fixture.homeTeamName) !== -1) {
                  const potNo = user.teamsNames.indexOf(fixture.homeTeamName);
                  user.teams[potNo].increaseGoals(fixture.goalsHomeTeam);
              }

              if (user.teamsNames.indexOf(fixture.awayTeamName) !== -1) {
                  const potNo = user.teamsNames.indexOf(fixture.awayTeamName);
                  user.teams[potNo].increaseGoals(fixture.goalsAwayTeam);
              }

          }

          const dateIndex = dates.indexOf(fixture.date.toDateString());

          if (dateIndex !== -1) {
            dateFixtures[dateIndex].addFixture(fixture);
          } else {
            dates.push(fixture.date.toDateString());
            const df = new DateFixture(fixture.date);
            df.addFixture(fixture);
            dateFixtures.push(df);
          }

        });
        this.users = this.users.sort(sortByTotalPoints);
        this.dateFixtures = dateFixtures;
      });
  }

}

function sortByTotalPoints(u1: User, u2: User): number {
  if (u1.totalPoints < u2.totalPoints) {
    return 1;
  } else if (u1.totalPoints === u2.totalPoints) {
    return 0;
  }
  return -1;
}

export class DateFixture {
  date: Date;
  fixtures: Fixture[] = [];
  fifaFixtures: FifaFixture[] = [];

  constructor(date: Date) {
    this.date = date;
  }

  addFifaFixture(fixture: FifaFixture) {
    this.fifaFixtures.push(fixture);
  }

  addFixture(fixture: Fixture) {
    this.fixtures.push(fixture);
  }
}
