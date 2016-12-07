import { Component, OnInit, Input , Output,EventEmitter} from '@angular/core';

import { User }        from './user';
import { AppService }		from './app.service'

import './rxjs-extensions';
declare var $:any;
@Component({
  selector: 'number',
  templateUrl: 'app/number.component.html',
  styleUrls: ['app/number.component.css'],
})

export class NumberComponent implements OnInit {
	@Input() number:number;
  showDetails:boolean = false;
  constructor(private services: AppService) {}
  classColor:string = "c" + (Math.floor((Math.random() * 12))+1);
  
  setBet(){
    this.services.exec('setBet',{number:this.number}).then(res =>{});
  }

  ngOnInit(){
    
  }

  winnerSection(){
    if(!this.services.timba.winnerNumber)
    return false;

    return this.getSection(this.number) == this.getSection(this.services.timba.winnerNumber.number);
  }

  getSection(number:number){
    if(number < 13)
    return 1;

    if(number > 24)
    return 3

    return 2;
  }

  isSelected(){
    return !this.services.timba.numbers[this.number - 1].players.every(player=>{return player.email != this.services.user.email});
  }

}