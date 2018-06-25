import { FifaFixture } from './fifa-fixture.model';

export class DateFixture {
    date: Date;

    fifaFixtures: FifaFixture[] = [];

    constructor(date: Date) {
      this.date = date;
    }

    addFifaFixture(fixture: FifaFixture) {
      this.fifaFixtures.push(fixture);
    }

}
