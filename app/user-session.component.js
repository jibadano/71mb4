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
var UserSessionComponent = (function () {
    function UserSessionComponent(services) {
        this.services = services;
        this.return = new core_1.EventEmitter();
        this.logOut = new core_1.EventEmitter();
    }
    UserSessionComponent.prototype.startTimba = function () {
        if (this.services.user.admin)
            this.services.exec('startTimba', {}).then(function (res) { });
    };
    UserSessionComponent.prototype.closeTimba = function () {
        this.services.exec('closeTimba', {}).then(function (res) { });
    };
    UserSessionComponent.prototype.notifyClose = function () {
        this.services.exec('notifyClose', {}).then(function (res) { });
    };
    UserSessionComponent.prototype.ngOnInit = function () {
    };
    return UserSessionComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserSessionComponent.prototype, "return", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserSessionComponent.prototype, "logOut", void 0);
UserSessionComponent = __decorate([
    core_1.Component({
        selector: 'user-session',
        templateUrl: 'app/user-session.component.html',
        styleUrls: ['app/user-session.component.css'],
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], UserSessionComponent);
exports.UserSessionComponent = UserSessionComponent;
//# sourceMappingURL=user-session.component.js.map