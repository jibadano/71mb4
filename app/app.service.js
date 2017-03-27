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
var http_1 = require("@angular/http");
var user_1 = require("./user");
var timba_1 = require("./timba");
require("./rxjs-extensions");
var AppService = (function () {
    function AppService(http) {
        var _this = this;
        this.http = http;
        this.user = new user_1.User();
        this.timba = new timba_1.Timba();
        this.nav = 'welcome';
        //socket : any = io.connect('http://192.168.0.7:8081');
        this.socket = io.connect('http://186.22.78.117:8081');
        setInterval(function () {
            var playTime = new Date();
            playTime.setHours(16);
            playTime.setMinutes(0);
            playTime.setSeconds(0);
            var diff = Math.floor((playTime.getTime() - new Date().getTime()) / 1000);
            _this.timeCountDown = _this.dhms(diff);
        }, 1000);
    }
    ;
    AppService.prototype.exec = function (serviceId, data) {
        return this.http.post('/services', JSON.stringify({ serviceId: serviceId, data: data }))
            .toPromise()
            .then(function (res) { return res.json().data; });
    };
    AppService.prototype.login = function (user) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(user.email + ':' + user.password) });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('/login', '', options)
            .toPromise()
            .then(function (res) { return _this.user = res.json(); });
    };
    ;
    AppService.prototype.forgotPassword = function (user) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(user.email + ':' + user.password) });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('/forgotPassword', '', options)
            .toPromise()
            .then(function (res) { return _this.user = res.json(); });
    };
    ;
    AppService.prototype.signIn = function (user) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(user.email + ':' + user.password) });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('/signIn', '', options)
            .toPromise()
            .then(function (res) { return _this.user = res.json(); });
    };
    ;
    AppService.prototype.getCurrentUser = function () {
        var _this = this;
        return this.http.get('/getCurrentUser')
            .toPromise()
            .then(function (res) { _this.user = res.json(); });
    };
    AppService.prototype.getTimba = function () {
        var _this = this;
        this.exec('getTimba', {}).then(function (res) { _this.timba = res; });
    };
    AppService.prototype.fetchTimba = function () {
        var _this = this;
        this.socket.on('timbaChange', function (timba) {
            if (timba.log.length != _this.timba.log.length || _this.timba.log.length == 0) {
                _this.timba = timba;
                setTimeout(function () {
                    var objDiv = document.getElementById("messages");
                    if (objDiv)
                        objDiv.scrollTop = objDiv.scrollHeight;
                }, 500);
            }
            _this.timba = timba;
        });
        this.exec('getTimba', {});
    };
    AppService.prototype.logout = function () {
        var _this = this;
        this.http.post('/logout', '').toPromise().then(function (res) {
            _this.user = new user_1.User();
        });
    };
    AppService.prototype.ngOnInit = function () {
        this.socket.on('error', function (exception) {
            this.exception = exception;
            this.socket.destroy();
        });
    };
    AppService.prototype.getTotalAmount = function () {
        var players = this.timba.players;
        var totalAmount = 0;
        for (var i = 0; i < players.length; i++)
            totalAmount += players[i].bets;
        return totalAmount * this.timba.betAmount;
    };
    AppService.prototype.getPlayerAmount = function () {
        var players = this.timba.players;
        for (var i = 0; i < players.length; i++)
            if (players[i].email == this.user.email)
                return Math.trunc(players[i].bets * this.timba.betAmount * 100) / 100;
        return 0;
    };
    AppService.prototype.getAverageAmount = function () {
        return Math.round(this.getTotalAmount() * 100 / this.timba.players.length) / 100;
    };
    AppService.prototype.getWinnerAmount = function () {
        var players = this.timba.players;
        for (var i = 0; i < players.length; i++)
            if (players[i].email == this.timba.winner)
                return players[i].bets * this.timba.betAmount;
        return 0;
    };
    AppService.prototype.dhms = function (t) {
        var days, hours, minutes, seconds;
        days = Math.floor(t / 86400);
        t -= days * 86400;
        hours = Math.floor(t / 3600);
        t -= hours * 3600;
        minutes = Math.floor(t / 60);
        t -= minutes * 60;
        seconds = t;
        return [
            hours + 'h',
            minutes + 'm',
            seconds + 's'
        ].join(' ');
    };
    return AppService;
}());
AppService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map