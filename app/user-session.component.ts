import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AppService}       from './app.service'

@Component({
  selector: 'user-session',
   templateUrl: 'app/user-session.component.html',
    styleUrls: ['app/user-session.component.css'],

})

export class UserSessionComponent implements OnInit {

    @Output() return = new EventEmitter<string>();
    @Output() logOut = new EventEmitter();

    constructor( private services: AppService) {}

    startTimba(){
        this.services.exec('startTimba',{}).then(res =>{});
    }

    closeTimba(){
        this.services.exec('closeTimba',{}).then(res =>{});
    }
    
    ngOnInit(){
    }

  
}