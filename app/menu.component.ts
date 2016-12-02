import { Component, OnInit, EventEmitter, Input, Output, Pipe} from '@angular/core';
import { AppService }		from './app.service'
import { logType }		from './timba'

import './rxjs-extensions';


// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'noChat'
})
export class NoChat {
  transform(value, args?) {
    return value.filter(log => {
      return log.type != logType.CHAT;
    });
  }
}

@Component({
  selector: 'menu',
  templateUrl: 'app/menu.component.html',
    styleUrls: ['app/menu.component.css'],
  pipes: [NoChat]
})

export class MenuComponent implements OnInit {
	@Input() menuOptions:string[];
	@Output() optionSelected = new EventEmitter<string>();

  timeCountDown : string;
  constructor(private services: AppService) {
    setInterval(() => {
        let playTime = new Date();
        playTime.setHours(23);
        playTime.setMinutes(0);
        playTime.setSeconds(0);
        let diff = Math.floor((playTime.getTime() - new Date().getTime()) / 1000);
        this.timeCountDown = this.dhms(diff);
     }, 1000);
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
             days + 'd',
             hours + 'h',
             minutes + 'm',
             seconds + 's'
            ].join(' ');                              
  }

  getTotalAmount(){
    let numbers = this.services.timba.numbers;
    let totalAmount = 0;
    for(var i = 0; i<numbers.length;i++)
      totalAmount += numbers[i].players.length;
    
    return totalAmount * this.services.timba.betAmount;
  }

  ngOnInit(){
    console.log(this.services.timba);
  }



}