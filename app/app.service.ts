import { Component, Injectable, OnInit  } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User }        from './user';
import { Timba }        from './timba';

import './rxjs-extensions';

declare var io: any;

@Injectable()
export class AppService implements OnInit{
    user : User = new User();
    timba : Timba = new Timba();
    constructor(private http: Http) {};
    socket : any = io.connect('http://localhost:4000');

    exec(serviceId : string, data: any): Promise<any>{
      return this.http.post('/services', JSON.stringify({serviceId: serviceId, data: data}))
      .toPromise()
      .then(res => res.json().data as any)
    }

    login(user : User): Promise<any>{
      let headers = new Headers({ 'Content-Type': 'application/json' , 'Authorization': 'Basic ' + btoa(user.email+ ':' + user.password)});
      let options = new RequestOptions({ headers: headers });

      return this.http.post('/login','',options)
      .toPromise()
      .then(res => {this.user = res.json();});
    };

    getCurrentUser(){
      return this.http.get('/getCurrentUser')
      .toPromise()
      .then(res => {this.user = res.json()});
    }

    fetchTimba(){
      this.socket.on('timbaChange', (timba)=>this.timba = timba);
	  }

    logout(){
		  this.http.post('/logout', '').toPromise().then(res=>{
        this.user = new User();
      });
	  }

    ngOnInit(){
      
    }
}