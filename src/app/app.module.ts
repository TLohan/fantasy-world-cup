import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UsersService } from './services/users.service';
import { FifaDataComponent } from './home/fifa-data.component';
import { LiveFixtureComponent } from './home/live-fixture.component';
import { LivescoreService } from './services/livescore.service';
import { FixturesListComponent } from './home/fixtures-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FifaDataComponent,
    LiveFixtureComponent,
    FixturesListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [UsersService, LivescoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
