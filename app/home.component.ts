import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { AppService }		from './app.service'
import { User }            from './user';
import { CustomValidators } from 'ng2-validation';
import {
	FormBuilder,
	FormGroup,
	FORM_DIRECTIVES,
	REACTIVE_FORM_DIRECTIVES,
	Validators
} from '@angular/forms';
import './rxjs-extensions';

@Component({
  selector: 'home',
  templateUrl:'app/home.component.html',
	directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})

export class HomeComponent implements OnInit {
	nav : string = 'welcome';
	formGroup :FormGroup;
err : any;
	@Input()
	user : User = new User();
	
	@Output() loginSuccess = new EventEmitter<User>();

    constructor(private services: AppService, private fb: FormBuilder) {};

  	login(){
      if(this.user.password != '' && this.user.email != ''){
        this.services.login(this.user).then((res)=>{
          if(res.err)
           this.err = res.err;
          else
            this.services.fetchTimba();
        });
      }
  	}
  
  	logout(){
		this.services.logout(); 
	}

  	ngOnInit(){

     this.services.getCurrentUser().then(()=>{
           this.services.fetchTimba();
     });
    }

  
}
