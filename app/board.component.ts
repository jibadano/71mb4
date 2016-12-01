import { Component, OnInit, Input , Output,EventEmitter} from '@angular/core';

import { User }        from './user';
import { AppService }		from './app.service'

import './rxjs-extensions';
declare var $:any;
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
    let buttons = $("board button");
      for(let i=0; i< buttons.length; i++){
        $(buttons[i]).addClass(this.getColor());
      }
  }

  getColor(){
    return "c" + (Math.floor((Math.random() * 12))+1);
  }

  isSelected(number:number){
    return !this.services.timba.numbers[number - 1].players.every(player=>{return player.email != this.services.user.email});
  }

}