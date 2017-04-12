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
 
	a = 3000/(Math.pow(20*this.services.timba.players.length,35));

	totalRounds = 20*this.services.timba.players.length;
	initialRounds = 10*this.services.timba.players.length;
	accRounds = 15*this.services.timba.players.length;
  ngOnInit(){
	  	
		$("#welcome").css("opacity","1");
		setTimeout(()=>{
			$("#welcome").css("opacity","0");
			setTimeout(()=>{
				this.addPlayerRoulette(0);
				this.addPlayerRouletteFade(0);
				setTimeout(()=>{
					this.showAndHide("three");
					setTimeout(()=>{
						this.showAndHide("two");
						setTimeout(()=>{
							this.showAndHide("one");
							setTimeout(()=>{
								this.rotate(this.services.timba.winnerIndex);
								setTimeout(()=>{
									this.services.playing = false;
									this.services.nav='winner';							
								},24000);
							},2000);				
						},2000);
					},2000);
				},500 * this.services.timba.players.length);
			},1000);
		},4000);
		
		
			
	}


	showAndHide(n:string){
		$("#"+n).css("opacity","1");
		setTimeout(()=>{
			$("#"+n).css("opacity","0");
		},1000);
	}

	addPlayerRoulette(i:number){
		if(i < this.services.timba.players.length){
			$("#roulette").append("<div id=\"roulette"+i+"\" class=\"roulette-cell\" style=\"transition:opacity 0.5s ease-in-out;opacity:0;transform: rotate(" + i*360/this.services.timba.players.length + "deg) translateX(200px);\">" + this.services.timba.players[i].email + "</div>");
			
			this.addPlayerRoulette(++i);
		}	
	}

	addPlayerRouletteFade(i:number){
		setTimeout(()=>{
			if(i < this.services.timba.players.length){
				$("#roulette"+ i).css("opacity","1");
				if(this.services.timba.players[i].email == this.services.user.email){
					$("#roulette"+ i).css("text-shadow","0 0 10px #fff");
					$("#roulette"+ i).css("font-weight","bold");

				}

				this.addPlayerRouletteFade(++i);
			}
		},500);
	}

	rotate(i:number){
		$("#roulette").css("transition","transform 20s cubic-bezier(0.2, 0, 0.000000000000000000000000000000000000000001, 1)");
		$("#roulette").css("transform","rotate("+ (4320 - Math.floor(i*360/this.services.timba.players.length)) + "deg)");
	}

}