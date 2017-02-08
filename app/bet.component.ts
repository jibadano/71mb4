import { Component} from '@angular/core';

import { AppService }		from './app.service'

@Component({
  selector: 'bet',
  templateUrl: 'app/bet.component.html',
  styleUrls: ['app/bet.component.css'],
})

export class BetComponent {

  constructor(private services: AppService) {}


  setBet(action:string){
    this.services.exec('setBet',{action:action});
  }
}