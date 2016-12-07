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
var NumberComponent = (function () {
    function NumberComponent(services) {
        this.services = services;
        this.showDetails = false;
        this.classColor = "c" + (Math.floor((Math.random() * 12)) + 1);
    }
    NumberComponent.prototype.setBet = function () {
        this.services.exec('setBet', { number: this.number }).then(function (res) { });
    };
    NumberComponent.prototype.ngOnInit = function () {
    };
    NumberComponent.prototype.winnerSection = function () {
        if (!this.services.timba.winnerNumber)
            return false;
        return this.getSection(this.number) == this.getSection(this.services.timba.winnerNumber.number);
    };
    NumberComponent.prototype.getSection = function (number) {
        if (number < 13)
            return 1;
        if (number > 24)
            return 3;
        return 2;
    };
    NumberComponent.prototype.isSelected = function () {
        var _this = this;
        return !this.services.timba.numbers[this.number - 1].players.every(function (player) { return player.email != _this.services.user.email; });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], NumberComponent.prototype, "number", void 0);
    NumberComponent = __decorate([
        core_1.Component({
            selector: 'number',
            templateUrl: 'app/number.component.html',
            styleUrls: ['app/number.component.css'],
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], NumberComponent);
    return NumberComponent;
}());
exports.NumberComponent = NumberComponent;
//# sourceMappingURL=number.component.js.map