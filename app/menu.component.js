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
var app_service_1 = require('./app.service');
var timba_1 = require('./timba');
require('./rxjs-extensions');
// Tell Angular2 we're creating a Pipe with TypeScript decorators
var NoChat = (function () {
    function NoChat() {
    }
    NoChat.prototype.transform = function (value, args) {
        return value.filter(function (log) {
            return log.type != timba_1.logType.CHAT;
        });
    };
    NoChat = __decorate([
        core_1.Pipe({
            name: 'noChat'
        }), 
        __metadata('design:paramtypes', [])
    ], NoChat);
    return NoChat;
}());
exports.NoChat = NoChat;
var MenuComponent = (function () {
    function MenuComponent(services) {
        var _this = this;
        this.services = services;
        this.optionSelected = new core_1.EventEmitter();
        setInterval(function () {
            var playTime = new Date();
            playTime.setHours(23);
            playTime.setMinutes(0);
            playTime.setSeconds(0);
            var diff = Math.floor((playTime.getTime() - new Date().getTime()) / 1000);
            _this.timeCountDown = _this.dhms(diff);
        }, 1000);
    }
    MenuComponent.prototype.dhms = function (t) {
        var days, hours, minutes, seconds;
        days = Math.floor(t / 86400);
        t -= days * 86400;
        hours = Math.floor(t / 3600);
        t -= hours * 3600;
        minutes = Math.floor(t / 60);
        t -= minutes * 60;
        seconds = t;
        return [
            days + 'd',
            hours + 'h',
            minutes + 'm',
            seconds + 's'
        ].join(' ');
    };
    MenuComponent.prototype.getTotalAmount = function () {
        var numbers = this.services.timba.numbers;
        var totalAmount = 0;
        for (var i = 0; i < numbers.length; i++)
            totalAmount += numbers[i].players.length;
        return totalAmount * this.services.timba.betAmount;
    };
    MenuComponent.prototype.ngOnInit = function () {
        console.log(this.services.timba);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MenuComponent.prototype, "menuOptions", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MenuComponent.prototype, "optionSelected", void 0);
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'menu',
            templateUrl: 'app/menu.component.html',
            styleUrls: ['app/menu.component.css'],
            pipes: [NoChat]
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map