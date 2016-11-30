import { Component, OnInit } from '@angular/core';
import { AppService }		from './app.service'
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  providers:[AppService]
})

export class AppComponent {
    nav = 'dashboard';
    
    constructor(private services: AppService) {};
      
  ngOnInit(){
    
  }
}