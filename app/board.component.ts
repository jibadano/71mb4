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

  firstRow:[number]= [1,4,7,10,13,16,19,22,25,28,31,34];
  secondRow:[number]= [2,5,8,11,14,17,20,23,26,29,32,35];
  thirdRow:[number]= [3,6,9,12,15,18,21,24,27,30,33,36];
  hide1st:boolean = false;
  hide2nd:boolean = false;
  hide3rd:boolean = false;
  winnerNumber:number = 0;
  winners:any;
  showWinners: boolean = false;  lastWinner: boolean = false; sorteando: boolean = false;

  constructor(private services: AppService) {}

  ngOnInit(){
    this.showWinners = false;

    let buttons = $("number button");
    for(let i=0; i< buttons.length; i++){
      $(buttons[i]).addClass(this.getColor());
    }

    


    this.services.socket.on('timbaWinnerNumber', (winnerNumber)=>{
      this.winners = winnerNumber;
        setTimeout(()=>{
            this.hideNotSelectedBoards(winnerNumber.number);
              setTimeout(()=>{
              this.winnerNumber = winnerNumber.number;
                setTimeout(()=>{
                  this.showWinners = true;
                  setTimeout(()=>{
                    this.sorteando = true;
                    setTimeout(()=>{
                      this.sorteando=false;
                      this.lastWinner = true; 
                    },5000);
                  },5000);
              },5000);
            },5000);
        },3000);
      });
  }

  hideNotSelectedBoards(number:number){
    if(number < 13){
     this.hide2nd = true;
      this.hide3rd = true;
      return;
    }

     if(number > 24){
     this.hide1st = true;
      this.hide2nd = true;
      return;
    }

      this.hide1st = true;
      this.hide3rd = true;
  }

  getColor(){
    return "c" + (Math.floor((Math.random() * 12))+1);
  }

}