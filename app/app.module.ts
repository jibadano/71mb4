import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { CommonModule } from '@angular/common';

import { AppComponent }  from './app.component';
import { CursorComponent }   from './cursor.component';
import { HomeComponent }   from './home.component';
import { UserSessionComponent }   from './user-session.component';
import { InfoComponent }   from './info.component';
import { AdminComponent }   from './admin.component';
import { BetComponent }   from './bet.component';
import { ChatComponent }   from './chat.component';
import { PlayersComponent }   from './players.component';
import { RouletteComponent }   from './roulette.component';

import { AppService }   from './app.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    AppComponent,
    BetComponent,
    CursorComponent,
    HomeComponent,
    UserSessionComponent,
    InfoComponent,
    AdminComponent,
    ChatComponent,
    PlayersComponent,
    RouletteComponent
  ],
   providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }