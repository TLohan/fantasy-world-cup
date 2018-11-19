import { Component, Input } from '../../../node_modules/@angular/core';
import { DateFixture } from 'models/date-fixture.model';
import { MatchStatus } from 'models/fifa-fixture.model';

@Component({
    selector: 'app-fixtures-list',
    templateUrl: 'fixtures-list.component.html',
})
export class FixturesListComponent {
    @Input() dateFixtures: DateFixture[];
}
