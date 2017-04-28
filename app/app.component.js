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
        this.suggestion = '';
        this.users = [];
        this.timbas = [];
        this.menu = 'account';
        this.balanceRequest = 0;
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
    AppComponent.prototype.reload = function () {
        location.reload();
    };
    AppComponent.prototype.sendSuggestion = function (msg) {
        console.log(msg);
        if (msg != '')
            this.services.exec('suggest', { msg: msg }).then(function (res) { console.log("res: " + res); });
    };
    AppComponent.prototype.getUsers = function () {
        var _this = this;
        this.services.exec('getUsers', {}).then(function (users) { _this.users = users; });
    };
    AppComponent.prototype.getTimbas = function () {
        var _this = this;
        this.services.exec('getTimbas', {}).then(function (timbas) { _this.timbas = timbas; });
    };
    AppComponent.prototype.getUser = function () {
        var _this = this;
        this.services.exec('getUser', {}).then(function (user) { _this.services.user = user; });
    };
    AppComponent.prototype.setBalance = function (user, action) {
        var _this = this;
        this.services.exec('setBalance', { user: user, action: action }).then(function (res) { _this.getUsers(); });
    };
    AppComponent.prototype.sendBalanceRequest = function () {
        var _this = this;
        this.services.exec('balanceRequest', { balanceRequest: this.balanceRequest }).then(function () { _this.balanceRequest = 0; _this.getUser(); });
    };
    AppComponent.prototype.cancelBalanceRequest = function (user) {
        var _this = this;
        this.services.exec('cancelBalanceRequest', { user: user }).then(function (res) { _this.getUser(); _this.getUsers(); });
    };
    AppComponent.prototype.approveBalanceRequest = function (user) {
        var _this = this;
        this.services.exec('approveBalanceRequest', { user: user }).then(function (res) { _this.getUsers(); });
    };
    AppComponent.prototype.getTotalAmount = function (timba) {
        var players = timba.players;
        var totalAmount = 0;
        for (var i = 0; i < players.length; i++)
            totalAmount += players[i].bets;
        return totalAmount * this.services.timba.betAmount;
    };
    AppComponent.prototype.startTimba = function () {
        if (this.services.user.admin)
            this.services.exec('startTimba', {}).then(function (res) { });
    };
    AppComponent.prototype.getWinnerAmount = function (timba) {
        var players = timba.players;
        for (var i = 0; i < players.length; i++)
            if (players[i].email == timba.winner)
                return Math.trunc(players[i].bets * this.services.timba.betAmount * 100) / 100;
        return 0;
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