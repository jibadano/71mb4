import { Component, Injectable, OnInit  } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User }        from './user';
import { Timba }        from './timba';

import './rxjs-extensions';

declare var io: any;
declare var $: any;
declare var window: any;

@Injectable()
export class AppService implements OnInit{
    user : User = new User();
    timba : Timba = new Timba();
    timeCountDown : string;
    nav:string='dashboard';
    active:boolean = false;
    socketId = '';
    playing = true;
    //socket : any = io.connect('http://192.168.0.7:8081');
    socket : any = io.connect('http://186.22.76.215:8081');

    exception : any;

    constructor(private http: Http) {
      
       setInterval(() => {
          let playTime = new Date();
          playTime.setHours(16);
          playTime.setMinutes(0);
          playTime.setSeconds(0);
          let diff = Math.floor((playTime.getTime() - new Date().getTime()) / 1000);
          this.timeCountDown = this.dhms(diff);
      }, 1000);
    };

    exec(serviceId : string, data: any): Promise<any>{
      return this.http.post('/services', JSON.stringify({serviceId: serviceId, data: data}))
      .toPromise()
      .then(res => res.json().data as any)
    }

    login(user : User): Promise<any>{
       
      let headers = new Headers({ 'Content-Type': 'application/json' , 'Authorization': 'Basic ' + btoa(user.email+ ':' + user.password)});
      let options = new RequestOptions({ headers: headers });
      return this.http.post('/login',JSON.stringify({socketId:this.socket.id}),options)
      .toPromise()
      .then(res => this.user = res.json() as any);
    };

    forgotPassword(user : User): Promise<any>{
      let headers = new Headers({ 'Content-Type': 'application/json' , 'Authorization': 'Basic ' + btoa(user.email+ ':' + user.password)});
      let options = new RequestOptions({ headers: headers });

      return this.http.post('/forgotPassword','',options)
      .toPromise()
      .then(res => this.user = res.json() as any);
    };

 signIn(user : User): Promise<any>{
      let headers = new Headers({ 'Content-Type': 'application/json' , 'Authorization': 'Basic ' + btoa(user.email+ ':' + user.password)});
      let options = new RequestOptions({ headers: headers });

      return this.http.post('/signIn','',options)
      .toPromise()
      .then(res => this.user = res.json() as any);
    };


    getCurrentUser(){
      return this.http.post('/getCurrentUser',JSON.stringify({socketId:this.socket.id}))
      .toPromise()
      .then(res => {this.user = res.json()})
      
    }


    fetchTimba(){
      this.socket.on('error', function(exception) {
        this.exception = exception;
        this.socket.destroy();
      });
      
      this.socket.on('userChange', (user) => {
        console.log('userChange: '+ user);
        this.user = user;
      });
      this.socket.on('timbaChange', (timba)=>{
        if(timba.log.length != this.timba.log.length || this.timba.log.length == 0){
          this.timba = timba;

          setTimeout(()=>{
            var objDiv = document.getElementById("messages");
            if(objDiv)
            objDiv.scrollTop = objDiv.scrollHeight;
          },500);
        }
          this.timba = timba});
	  }

    logout(){
		  this.http.post('/logout', '').toPromise().then(res=>{
        this.user = new User();
      });
	  }

    ngOnInit(){
    
    }


    getTotalAmount(){
      let players = this.timba.players;
      let totalAmount = 0;
      for(var i = 0; i<players.length;i++)
        totalAmount += players[i].bets;
      
      return totalAmount * this.timba.betAmount;
    }

    getPlayerAmount(){
      let players = this.timba.players;
      for(var i = 0; i<players.length;i++)
        if(players[i].email == this.user.email)
          return Math.trunc(players[i].bets * this.timba.betAmount*100)/100;
      
      return 0;
    }

    getAverageAmount(){
      return Math.round(this.getTotalAmount()*100 / this.timba.players.length)/100;
    }

  getWinnerAmount(){
      let players = this.timba.players;
      for(var i = 0; i<players.length;i++)
        if(players[i].email == this.timba.winner)
          return players[i].bets * this.timba.betAmount;
      
      return 0;
    }




dhms(t){
     var days, hours, minutes, seconds;
     days = Math.floor(t / 86400);
     t -= days * 86400;
     hours = Math.floor(t / 3600);
     t -= hours * 3600;
     minutes = Math.floor(t / 60);
     t -= minutes * 60;
     seconds = t;

     return [
             hours + 'h',
             minutes + 'm',
             seconds + 's'
            ].join(' ');                              
  }

}