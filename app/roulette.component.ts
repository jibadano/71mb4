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
	a = 3000/(Math.pow(10*this.services.timba.players.length,35));

  ngOnInit(){
		this.addPlayerRoulette(0);
		/*for(var i=0;i<this.players.length;i++){
			$("#roulette").append("<div class=\"roulette-cell\" style=\"transform: rotate(" + i*360/this.players.length + "deg) translateX(200px);\">" + this.players[i] + "</div>");
		}*/
		//this.rotate(7*this.players.length);

		 this.services.socket.on('timbaStart', (timba)=>{
				this.rotate(3*this.services.timba.players.length);
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
		let timeout = Math.pow(i,35)*this.a;
		console.log(timeout);
		setTimeout(()=>{
			if(i <= 10*this.services.timba.players.length){
				$("#roulette").css("transition","transform linear "+ timeout/1000 + "s");
				$("#roulette").css("transform","rotate("+ i*360/this.services.timba.players.length + "deg)");
				this.rotate(++i);
			}
		},timeout - 100);
	}

}