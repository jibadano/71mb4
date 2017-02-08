import { Component } from '@angular/core';
import { AppService }		from './app.service'

@Component({
  selector: 'info',
  templateUrl: 'app/info.component.html',
    styleUrls: ['app/info.component.css']
})

export class InfoComponent {

  constructor(private services: AppService) {}

}