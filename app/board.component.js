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
var app_service_1 = require('./app.service');
require('./rxjs-extensions');
var BoardComponent = (function () {
    function BoardComponent(services) {
        this.services = services;
        this.firstRow = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
        this.secondRow = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
        this.thirdRow = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
        this.hide1st = false;
        this.hide2nd = false;
        this.hide3rd = false;
        this.winnerNumber = 0;
        this.showWinners = false;
        this.lastWinner = false;
        this.sorteando = false;
    }
    BoardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showWinners = false;
        var buttons = $("number button");
        for (var i = 0; i < buttons.length; i++) {
            $(buttons[i]).addClass(this.getColor());
        }
        this.services.socket.on('timbaWinnerNumber', function (winnerNumber) {
            _this.winners = winnerNumber;
            setTimeout(function () {
                _this.hideNotSelectedBoards(winnerNumber.number);
                setTimeout(function () {
                    _this.winnerNumber = winnerNumber.number;
                    setTimeout(function () {
                        _this.showWinners = true;
                        setTimeout(function () {
                            _this.sorteando = true;
                            setTimeout(function () {
                                _this.sorteando = false;
                                _this.lastWinner = true;
                            }, 5000);
                        }, 5000);
                    }, 5000);
                }, 5000);
            }, 3000);
        });
    };
    BoardComponent.prototype.hideNotSelectedBoards = function (number) {
        if (number < 13) {
            this.hide2nd = true;
            this.hide3rd = true;
            return;
        }
        if (number > 24) {
            this.hide1st = true;
            this.hide2nd = true;
            return;
        }
        this.hide1st = true;
        this.hide3rd = true;
    };
    BoardComponent.prototype.getColor = function () {
        return "c" + (Math.floor((Math.random() * 12)) + 1);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_1.User)
    ], BoardComponent.prototype, "user", void 0);
    BoardComponent = __decorate([
        core_1.Component({
            selector: 'board',
            templateUrl: 'app/board.component.html',
            styleUrls: ['app/board.component.css'],
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], BoardComponent);
    return BoardComponent;
}());
exports.BoardComponent = BoardComponent;
//# sourceMappingURL=board.component.js.map