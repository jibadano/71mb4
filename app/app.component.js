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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_service_1 = require("./app.service");
var AppComponent = (function () {
    function AppComponent(services) {
        this.services = services;
        this.nav = 'dashboard';
        this.isMobile = false;
        this.showPlayers = false;
        this.showInfo = false;
        this.showChat = false;
        this.showBet = false;
        this.fadeState = 'hide';
    }
    ;
    AppComponent.prototype.showOrHide = function (component) {
        if (component == "all") {
            if (this.fadeState == 'show') {
                this.fadeState = 'hide';
            }
            else {
                this.fadeState = 'show';
            }
        }
        this.showPlayers = (component == "players") ? !this.showPlayers : this.showPlayers;
        this.showInfo = (component == "info") ? !this.showInfo : this.showInfo;
        this.showChat = (component == "chat") ? !this.showChat : this.showChat;
        this.showBet = (component == "bet") ? !this.showBet : this.showBet;
    };
    AppComponent.prototype.ngOnInit = function () {
        this.isMobile = isMobile;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/app.component.html',
        styleUrls: ['app/app.component.css'],
        providers: [app_service_1.AppService],
        animations: [
            core_1.trigger('fadeState', [
                core_1.state('show', core_1.style({
                    opacity: 1
                })),
                core_1.state('hide', core_1.style({
                    opacity: 0
                })),
                core_1.transition('show => hide', core_1.animate('250ms ease-in')),
                core_1.transition('hide => show', core_1.animate('250ms ease-out'))
            ])
        ]
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map