"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var user_1 = require('./user');
var timba_1 = require('./timba');
var app_service_1 = require('./app.service');
require('./rxjs-extensions');
var ChatComponent = (function () {
    function ChatComponent(services) {
        this.services = services;
    }
    ChatComponent.prototype.ngOnInit = function () {
        this.services.socket.on('logChange', function () {
            var elem = document.getElementById('messages');
            elem.scrollTop = elem.scrollHeight;
        });
    };
    ChatComponent.prototype.sendMessage = function (message) {
        if (message != '')
            this.services.exec('addLog', { log: { type: timba_1.logType.CHAT, username: this.services.user.email, msg: message } }).then(function (res) { });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_1.User)
    ], ChatComponent.prototype, "user", void 0);
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'chat',
            templateUrl: 'app/chat.component.html',
            styleUrls: ['app/chat.component.css']
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map