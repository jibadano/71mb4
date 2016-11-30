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
var DashboardComponent = (function () {
    function DashboardComponent(services) {
        this.services = services;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        console.log(this.services.timba);
    };
    DashboardComponent.prototype.getTotalBetAmount = function () {
        var _this = this;
        var totalAmount = 0;
        for (var i = 0; i < this.services.timba.numbers.length; i++) {
            var exists = !this.services.timba.numbers[i].players.every(function (player) {
                return player.email != _this.services.user.email;
            });
            if (exists)
                totalAmount += 1;
        }
        return totalAmount * this.services.timba.betAmount;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_1.User)
    ], DashboardComponent.prototype, "user", void 0);
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: 'app/dashboard.component.html',
            styleUrls: ['app/dashboard.component.css']
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map