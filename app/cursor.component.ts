import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from './user';
import { AppService } from './app.service'

import './rxjs-extensions';

@Component({
	selector: 'cursor',
	templateUrl: 'app/cursor.component.html',
	styleUrls: ['app/cursor.component.css']
})

export class CursorComponent implements OnInit {
	@Input() user: User;

	skewleft = false;
	skewright = false;
	skewup = false;
	skewdown = false;

	showing = {
		'players': false,
		'chat': false,
		'bet': false,
		'info': false
	}

	display = 'title';

	constructor(private services: AppService) { }

	@Output() showOrHide = new EventEmitter<string>();

	show(component: string, event: string) {
		if (event == 'click') {
			this.showing[component] = !this.showing[component];
		}

		if (event == 'leave') {
			this.skew(component, false);
			if (!this.showing[component])
				this.showOrHide.emit(component);
		}

		if (event == 'enter') {
			this.skew(component, true);

			if (!this.showing[component])
				this.showOrHide.emit(component);
		}


	}

	skew(component: string, val: boolean) {
		this.skewleft = (component == 'players') ? val : this.skewleft;
		this.skewright = (component == 'chat') ? val : this.skewright;
		this.skewup = (component == 'info') ? val : this.skewup;
		this.skewdown = (component == 'bet') ? val : this.skewdown;

	}


	ngOnInit() {
		this.setDisplay();
	}

	setDisplay(){
		setTimeout(()=>{
				if(this.display == 'title')
					this.display = 'timeLeft';
				else if(this.display == 'timeLeft')
					this.display = 'totalAmount';
				else if(this.display == 'totalAmount')
					this.display = 'title'

				this.setDisplay();
			},6000
		);
	}

}