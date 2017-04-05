import { Component, OnInit, trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';
import { AppService }		from './app.service';
import { User }		from './user'
import { Timba }		from './timba'

import { HTTP_PROVIDERS } from '@angular/http';
declare var isMobile:any;
declare var location:any;
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
  suggestion= '';
  users : User[] = [];
  timbas: Timba[] = [];
  menu='account';
  balanceRequest: number= 0;

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

  reload(){
    location.reload();
  }

  sendSuggestion(msg:string){
    console.log(msg);
    if(msg != '')
      this.services.exec('suggest',{msg:msg}).then(res =>{console.log("res: "+ res)});

  }

  getUsers(){
    this.services.exec('getUsers',{}).then(users =>{this.users = users});
  }

  getTimbas(){
    this.services.exec('getTimbas',{}).then(timbas =>{this.timbas = timbas});
  }

  getUser(){
    this.services.exec('getUser',{}).then(user =>{this.services.user = user});
  }


  setBalance(user:User,action:string){
    this.services.exec('setBalance',{user:user,action:action}).then(res =>{this.getUsers()});
  }

   sendBalanceRequest(){
    this.services.exec('balanceRequest',{balanceRequest: this.balanceRequest}).then(() =>{this.balanceRequest = 0});
  }

  cancelBalanceRequest(user:User){
    this.services.exec('cancelBalanceRequest',{user:user}).then(res =>{this.getUsers()});
  }

  approveBalanceRequest(user:User){
    this.services.exec('approveBalanceRequest',{user:user}).then(res =>{this.getUsers()});
  }


}