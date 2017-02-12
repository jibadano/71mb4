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
require('./rxjs-extensions');
var RouletteComponent = (function () {
    function RouletteComponent(services) {
        this.services = services;
        this.a = 3000 / (Math.pow(20 * this.services.timba.players.length, 35));
        this.totalRounds = 20 * this.services.timba.players.length;
        this.initialRounds = 10 * this.services.timba.players.length;
        this.accRounds = 15 * this.services.timba.players.length;
    }
    RouletteComponent.prototype.ngOnInit = function () {
        var _this = this;
        $("#welcome").css("opacity", "1");
        setTimeout(function () {
            $("#welcome").css("opacity", "0");
        }, 4000);
        setTimeout(function () {
            _this.addPlayerRoulette(0);
            _this.addPlayerRouletteFade(0);
        }, 5000);
        this.services.socket.on('timbaStart', function (timba) {
            _this.showAndHide("three");
            setTimeout(function () {
                _this.showAndHide("two");
                setTimeout(function () {
                    _this.showAndHide("one");
                    setTimeout(function () {
                        _this.rotate(timba.winnerIndex);
                        setTimeout(function () {
                            _this.services.nav = 'winner';
                        }, 24000);
                    }, 2000);
                }, 2000);
            }, 2000);
            console.log(timba.winner);
            console.log(timba.winnerIndex);
        });
    };
    RouletteComponent.prototype.startTimba = function () {
        this.services.exec('startTimba', {}).then(function (res) { });
    };
    RouletteComponent.prototype.showAndHide = function (n) {
        $("#" + n).css("opacity", "1");
        setTimeout(function () {
            $("#" + n).css("opacity", "0");
        }, 1000);
    };
    RouletteComponent.prototype.addPlayerRoulette = function (i) {
        if (i < this.services.timba.players.length) {
            $("#roulette").append("<div id=\"roulette" + i + "\" class=\"roulette-cell\" style=\"transition:opacity 0.5s ease-in-out;opacity:0;transform: rotate(" + i * 360 / this.services.timba.players.length + "deg) translateX(200px);\">" + this.services.timba.players[i].email + "</div>");
            this.addPlayerRoulette(++i);
        }
    };
    RouletteComponent.prototype.addPlayerRouletteFade = function (i) {
        var _this = this;
        setTimeout(function () {
            if (i < _this.services.timba.players.length) {
                $("#roulette" + i).css("opacity", "1");
                if (_this.services.timba.players[i].email == _this.services.user.email) {
                    $("#roulette" + i).css("text-shadow", "0 0 10px #fff");
                    $("#roulette" + i).css("font-weight", "bold");
                }
                _this.addPlayerRouletteFade(++i);
            }
        }, 500);
    };
    RouletteComponent.prototype.rotate = function (i) {
        $("#roulette").css("transition", "transform 20s cubic-bezier(0.2, 0, 0.000000000000000000000000000000000000000001, 1)");
        $("#roulette").css("transform", "rotate(" + (4320 - Math.floor(i * 360 / this.services.timba.players.length)) + "deg)");
    };
    RouletteComponent = __decorate([
        core_1.Component({
            selector: 'roulette',
            templateUrl: 'app/roulette.component.html',
            styleUrls: ['app/roulette.component.css']
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], RouletteComponent);
    return RouletteComponent;
}());
exports.RouletteComponent = RouletteComponent;
//# sourceMappingURL=roulette.component.js.map