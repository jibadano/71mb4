import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import { AppService }		from './app.service'

import { User }        from './user';

@Component({
  selector: 'admin',
  templateUrl: 'app/admin.component.html',
  styleUrls: ['app/admin.component.css']
})

export class AdminComponent implements OnInit {

	users: User[] = [];

	nav = 'home';
	newUser = new User();
	
  constructor(private services: AppService) {}
 
 	@Output() return = new EventEmitter<string>();
	ngOnInit(){

	}
}