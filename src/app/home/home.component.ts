import { Component, OnInit } from '@angular/core';
import { User } from 'models/user.model';
import { UsersService } from '../services/users.service';
import { Fixture } from 'models/fixture.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[];

  constructor(private usersService: UsersService) { 
    this.users = [
      new User('Tom', ['England', 'Uruguay', 'Nigeria', 'South Korea']),
      new User('Mark', ['Spain', 'Switzerland', 'Egypt', 'Tunisia']),
      new User('Marc', ['Argentina', 'Croatia', 'Sweden', 'Iran']),
      new User('Daragh', ['Brazil', 'Russia', 'Serbia', 'Panama']),
      new User('Gav', ['France', 'Denmark', 'Iceland', 'Australia']),
      new User('Ciaran', ['Portugal', 'Poland', 'Senegal', 'Saudi Arabia']),
      new User('Romano', ['Germany', 'Mexico', 'Morocco', 'Japan']),
      new User('Dave', ['Belgium', 'Colombia', 'Peru', 'Costa Rica']),
  ];
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe(result => {
      const fixtures: Fixture[] = [];
      for (let index = 0; index < result['count']; index++) {
        const fixtureJson = result['fixtures'][index];
        fixtures[index] = new Fixture(fixtureJson);
      }
      fixtures.forEach(fixture => {
          console.log(`${fixture.homeTeamName} ${fixture.goalsHomeTeam} : ${fixture.goalsAwayTeam} ${fixture.awayTeamName}`);

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
        });
        this.users = this.users.sort(sortByTotalPoints);
      });
  }

}

function sortByTotalPoints(u1: User, u2: User): number {
  if (u1.totalPoints < u2.totalPoints){
    return 1;
  } else if (u1.totalPoints === u2.totalPoints){
    return 0;
  }
  return -1;
}
