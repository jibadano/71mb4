import { Component, OnInit, Input } from '@angular/core';

import { AppService }		from './app.service'

import './rxjs-extensions';

declare var $:any;

@Component({
  selector: 'roulette',
  templateUrl: 'app/roulette.component.html',
  styleUrls: ['app/roulette.component.css']
})

export class RouletteComponent implements OnInit {

  constructor(private services: AppService) {}
  players = ['jibadano', 'cacho', 'pepe', 'wacho', 'vieja','cagon','amarrete','hijodeputa','cometrava','conchudo','jibadano', 'cacho', 'pepe', 'wacho', 'vieja','cagon','amarrete','hijodeputa','cometrava','conchudo','jibadano', 'cacho', 'pepe', 'wacho', 'vieja','cagon','amarrete','hijodeputa','cometrava','conchudo','jibadano', 'cacho', 'pepe', 'wacho', 'vieja','cagon','amarrete','hijodeputa','cometrava','conchudo','jibadano', 'cacho', 'pepe', 'wacho', 'vieja','cagon','amarrete','hijodeputa','cometrava','conchudo','jibadano', 'cacho', 'pepe', 'wacho', 'vieja','cagon','amarrete','hijodeputa','cometrava','conchudo'];
	a = 3000/(Math.pow(20*this.services.timba.players.length,35));

	totalRounds = 20*this.services.timba.players.length;
	initialRounds = 10*this.services.timba.players.length;
	accRounds = 15*this.services.timba.players.length;
  ngOnInit(){
		this.addPlayerRoulette(0);
		/*for(var i=0;i<this.players.length;i++){
			$("#roulette").append("<div class=\"roulette-cell\" style=\"transform: rotate(" + i*360/this.players.length + "deg) translateX(200px);\">" + this.players[i] + "</div>");
		}*/
		//this.rotate(7*this.players.length);

		 this.services.socket.on('timbaStart', (timba)=>{
			 this.totalRounds+= timba.winnerIndex;
			 console.log(timba.winner);
			 console.log(timba.winnerIndex);
				this.rotate(this.initialRounds);
		 });
	}

	addPlayerRoulette(i:number){
		setTimeout(()=>{
			if(i < this.services.timba.players.length){
				$("#roulette").append("<div class=\"roulette-cell\" style=\"transform: rotate(" + i*360/this.services.timba.players.length + "deg) translateX(200px);\">" + this.services.timba.players[i].email + "</div>");
				this.addPlayerRoulette(++i);
			}
	},500);
	}

	rotate(i:number){
		let n = i;
		if(i< this.accRounds)
			n = this.initialRounds;

		let timeout = Math.pow(n,35)*this.a;
		setTimeout(()=>{
			if(i <= this.totalRounds){
				$("#roulette").css("transition","transform linear "+ timeout/1000 + "s");
				$("#roulette").css("transform","rotate("+ i*360/this.services.timba.players.length + "deg)");
				
				this.rotate(++i);
			}
		},timeout - 100);
	}

}