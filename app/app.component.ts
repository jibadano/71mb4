import { Component, OnInit } from '@angular/core';
import { AppService }		from './app.service'
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls:['app/app.component.css'],
  providers:[AppService]
})

export class AppComponent {
  nav = 'dashboard';
  
  showPlayers = false;
  showInfo = false;
  showChat = false;
  showBet = false;

  constructor(private services: AppService) {};
    
  showOrHide(component : string){
    this.showPlayers = (component == "players")? !this.showPlayers : this.showPlayers;
    this.showInfo = (component == "info")? !this.showInfo : this.showInfo;
    this.showChat = (component == "chat")? !this.showChat : this.showChat;
    this.showBet = (component == "bet")? !this.showBet : this.showBet;
  }

  ngOnInit(){
  }
}