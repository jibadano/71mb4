import { Component, OnInit, trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';
import { AppService }		from './app.service'
import { HTTP_PROVIDERS } from '@angular/http';
declare var isMobile:any;
@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls:['app/app.component.css'],
  providers:[AppService],
  animations: [
    trigger('fadeState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('250ms ease-in')),
      transition('hide => show', animate('250ms ease-out'))
    ])
  ]
})

export class AppComponent {
  nav = 'dashboard';
  isMobile = false;
  showPlayers = false;
  showInfo = false;
  showChat = false;
  showBet = false;
  fadeState ='hide';

  constructor(private services: AppService) {};
    
  showOrHide(component : string){
    if(component == "all"){
      if(this.fadeState=='show'){
        this.fadeState= 'hide';
      }
      else{
        this.fadeState= 'show';
      }

    }
    this.showPlayers = (component == "players")? !this.showPlayers : this.showPlayers;
    this.showInfo = (component == "info")? !this.showInfo : this.showInfo;
    this.showChat = (component == "chat")? !this.showChat : this.showChat;
    this.showBet = (component == "bet")? !this.showBet : this.showBet;
  }

  ngOnInit(){
    this.isMobile = isMobile;
  }
}