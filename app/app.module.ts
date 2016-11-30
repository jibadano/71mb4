import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { CommonModule } from '@angular/common';

import { AppComponent }  from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { HomeComponent }   from './home.component';
import { UserSessionComponent }   from './user-session.component';
import { MenuComponent }   from './menu.component';
import { AdminComponent }   from './admin.component';
import { BoardComponent }   from './board.component';
import { ChatComponent }   from './chat.component';

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
    BoardComponent,
    DashboardComponent,
    HomeComponent,
    UserSessionComponent,
    MenuComponent,
    AdminComponent,
    ChatComponent
  ],
   providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }