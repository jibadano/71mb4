import { Component, OnInit, Input } from '@angular/core';

import { User }        from './user';
import { AppService }		from './app.service'

import './rxjs-extensions';

@Component({
  selector: 'dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	@Input() user:User;

  constructor(private services: AppService) {}
  
  ngOnInit(){
		
  }

	getTotalBetAmount(){
		let totalAmount = 0;
		for(let i=0; i<this.services.timba.numbers.length; i++){
			var exists = !this.services.timba.numbers[i].players.every((player)=>{
				return player.email != this.services.user.email;
			});
			if(exists)
				totalAmount += 1;
		}
		return totalAmount * this.services.timba.betAmount;
	}

}