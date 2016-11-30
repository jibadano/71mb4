import { Component, OnInit, Input , Output,EventEmitter} from '@angular/core';

import { User }        from './user';
import { AppService }		from './app.service'

import './rxjs-extensions';

@Component({
  selector: 'board',
  templateUrl: 'app/board.component.html',
  styleUrls: ['app/board.component.css'],
})

export class BoardComponent implements OnInit {
	@Input() user:User;

  constructor(private services: AppService) {}
  
  setBet(number:number){
    this.services.exec('setBet',{number:number}).then(res =>{});
  }

  ngOnInit(){
  }

}