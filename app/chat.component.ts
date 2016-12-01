import { Component, OnInit, Input } from '@angular/core';

import { User }        from './user';
import { Timba }        from './timba';
import { logType }        from './timba';

import { AppService }		from './app.service'

import './rxjs-extensions';

@Component({
  selector: 'chat',
  templateUrl: 'app/chat.component.html',
  styleUrls: ['app/chat.component.css']
})

export class ChatComponent implements OnInit {
	@Input() user:User;
  constructor(private services: AppService) {}
  
  ngOnInit(){
    window.setInterval(function() {
      var elem = document.getElementById('messages');
      elem.scrollTop = elem.scrollHeight;
    }, 1000);
  }

  sendMessage(message: string){
    if(message != '')
      this.services.exec('addLog',{log:{type:logType.CHAT,username:this.services.user.email, msg: message}}).then(res =>{});
  }


}