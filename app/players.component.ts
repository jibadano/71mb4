import { Component } from '@angular/core';
import { AppService }		from './app.service'

declare var $:any;
declare var window:any;

@Component({
  selector: 'players',
  templateUrl: 'app/players.component.html',
  styleUrls: ['app/players.component.css'],
})

export class PlayersComponent {
	  constructor(private services: AppService) {}
}