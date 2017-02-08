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
        this.players = ['jibadano', 'cacho', 'pepe', 'wacho', 'vieja', 'cagon', 'amarrete', 'hijodeputa', 'cometrava', 'conchudo', 'jibadano', 'cacho', 'pepe', 'wacho', 'vieja', 'cagon', 'amarrete', 'hijodeputa', 'cometrava', 'conchudo', 'jibadano', 'cacho', 'pepe', 'wacho', 'vieja', 'cagon', 'amarrete', 'hijodeputa', 'cometrava', 'conchudo', 'jibadano', 'cacho', 'pepe', 'wacho', 'vieja', 'cagon', 'amarrete', 'hijodeputa', 'cometrava', 'conchudo', 'jibadano', 'cacho', 'pepe', 'wacho', 'vieja', 'cagon', 'amarrete', 'hijodeputa', 'cometrava', 'conchudo', 'jibadano', 'cacho', 'pepe', 'wacho', 'vieja', 'cagon', 'amarrete', 'hijodeputa', 'cometrava', 'conchudo'];
        this.a = 3000 / (Math.pow(10 * this.services.timba.players.length, 35));
    }
    RouletteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addPlayerRoulette(0);
        /*for(var i=0;i<this.players.length;i++){
            $("#roulette").append("<div class=\"roulette-cell\" style=\"transform: rotate(" + i*360/this.players.length + "deg) translateX(200px);\">" + this.players[i] + "</div>");
        }*/
        //this.rotate(7*this.players.length);
        this.services.socket.on('timbaStart', function (timba) {
            _this.rotate(3 * _this.services.timba.players.length);
        });
    };
    RouletteComponent.prototype.addPlayerRoulette = function (i) {
        var _this = this;
        setTimeout(function () {
            if (i < _this.services.timba.players.length) {
                $("#roulette").append("<div class=\"roulette-cell\" style=\"transform: rotate(" + i * 360 / _this.services.timba.players.length + "deg) translateX(200px);\">" + _this.services.timba.players[i].email + "</div>");
                _this.addPlayerRoulette(++i);
            }
        }, 500);
    };
    RouletteComponent.prototype.rotate = function (i) {
        var _this = this;
        var timeout = Math.pow(i, 35) * this.a;
        console.log(timeout);
        setTimeout(function () {
            if (i <= 10 * _this.services.timba.players.length) {
                $("#roulette").css("transition", "transform linear " + timeout / 1000 + "s");
                $("#roulette").css("transform", "rotate(" + i * 360 / _this.services.timba.players.length + "deg)");
                _this.rotate(++i);
            }
        }, timeout - 100);
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