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
var user_1 = require("./user");
var forms_1 = require("@angular/forms");
require("./rxjs-extensions");
var HomeComponent = (function () {
    function HomeComponent(services, fb) {
        this.services = services;
        this.fb = fb;
        this.nav = 'welcome';
        this.user = new user_1.User();
        this.repeatPassword = '';
        this.loginSuccess = new core_1.EventEmitter();
    }
    ;
    HomeComponent.prototype.login = function () {
        var _this = this;
        if (this.user.password && this.user.password != '' && this.user.email && this.user.email != '') {
            this.services.login(this.user).then(function (res) {
                if (res.err)
                    _this.err = res.err;
                else {
                    _this.services.fetchTimba();
                    _this.err = {};
                }
            });
        }
        else {
            this.err = { msg: "Must complete user and password" };
        }
    };
    HomeComponent.prototype.forgotPassword = function () {
        if (this.user.email != '') {
            this.services.forgotPassword(this.user).then(function (res) {
            });
        }
    };
    HomeComponent.prototype.signIn = function () {
        var _this = this;
        if (this.user.email && this.user.email != '' && this.user.password == this.repeatPassword) {
            this.services.signIn(this.user).then(function (res) {
                _this.nav = 'login';
                _this.err = {};
                _this.login();
            });
        }
        else {
            if (!this.user.email || this.user.email == '')
                this.err = { msg: "Must complete email" };
            if (this.user.password != this.repeatPassword)
                this.err = { msg: "Wrong password confirmation" };
        }
    };
    HomeComponent.prototype.logout = function () {
        this.services.logout();
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.services.getCurrentUser().then(function () {
            _this.services.fetchTimba();
            //this.services.getTimba();
        });
    };
    return HomeComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", user_1.User)
], HomeComponent.prototype, "user", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], HomeComponent.prototype, "loginSuccess", void 0);
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        templateUrl: 'app/home.component.html',
        directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES]
    }),
    __metadata("design:paramtypes", [app_service_1.AppService, forms_1.FormBuilder])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map