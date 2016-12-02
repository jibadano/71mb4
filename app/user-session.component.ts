import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User }            from './user';
import { AppService}       from './app.service'
import './rxjs-extensions';

@Component({
  selector: 'user-session',
  template: `
        <div *ngIf="services.user" class="btn-group">
            <button type="button" class="btn btn-primary" (click)="showMenu = !showMenu" ><i class="fa fa-user"></i>  {{services.user.email}}</button>
            <button *ngIf="showMenu && services.user.admin" (click)="closeTimba();showMenu = false" type="button" class="btn btn-primary" ><i class="fa fa-times"></i></button>
            <button *ngIf="showMenu && services.user.admin" (click)="startTimba();showMenu = false" type="button" class="btn btn-primary" ><i class="fa fa-play"></i></button>
            <button type="button" (click)="logOut.emit();showMenu = false" class="btn btn-primary" ><i class="fa fa-power-off"></i></button>
        </div>
    `,
    styleUrls: ['app/user-session.component.css'],

})

export class UserSessionComponent implements OnInit {

    @Output() return = new EventEmitter<string>();
    @Output() logOut = new EventEmitter();

    showMenu = false;
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