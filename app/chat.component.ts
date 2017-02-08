import { Component, OnInit, Input } from '@angular/core';

import { User }        from './user';
import { Timba }        from './timba';
import { logType }        from './timba';

import { AppService }		from './app.service'

@Component({
  selector: 'chat',
  templateUrl: 'app/chat.component.html',
  styleUrls: ['app/chat.component.css']
})

export class ChatComponent implements OnInit {
  constructor(private services: AppService) {}
  
  ngOnInit(){
      this.services.socket.on('logChange', ()=>{
         var elem = document.getElementById('messages');
        elem.scrollTop = elem.scrollHeight;
      });
  }

  sendMessage(message: string){
    if(message != '')
      this.services.exec('addLog',{log:{type:logType.CHAT,username:this.services.user.email, msg: message}}).then(res =>{});
  }


}