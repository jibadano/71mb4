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
var user_1 = require("./user");
var app_service_1 = require("./app.service");
require("./rxjs-extensions");
var CursorComponent = (function () {
    function CursorComponent(services) {
        this.services = services;
        this.skewleft = false;
        this.skewright = false;
        this.skewup = false;
        this.skewdown = false;
        this.showing = {
            'players': false,
            'chat': false,
            'bet': false,
            'info': false
        };
        this.display = 'play';
        this.showOrHide = new core_1.EventEmitter();
    }
    CursorComponent.prototype.show = function (component, event) {
        if (event == 'click') {
            this.showing[component] = !this.showing[component];
        }
        if (event == 'leave') {
            this.skew(component, false);
            if (!this.showing[component])
                this.showOrHide.emit(component);
        }
        if (event == 'enter') {
            this.skew(component, true);
            if (!this.showing[component])
                this.showOrHide.emit(component);
        }
    };
    CursorComponent.prototype.skew = function (component, val) {
        this.skewleft = (component == 'players') ? val : this.skewleft;
        this.skewright = (component == 'chat') ? val : this.skewright;
        this.skewup = (component == 'info') ? val : this.skewup;
        this.skewdown = (component == 'bet') ? val : this.skewdown;
    };
    CursorComponent.prototype.ngOnInit = function () {
        if (this.services.timba.winner)
            this.display = 'title';
    };
    CursorComponent.prototype.setDisplay = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.display == 'title')
                _this.display = 'timeLeft';
            else if (_this.display == 'timeLeft')
                _this.display = 'totalAmount';
            else if (_this.display == 'totalAmount')
                _this.display = 'title';
            _this.setDisplay();
        }, 6000);
    };
    return CursorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", user_1.User)
], CursorComponent.prototype, "user", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CursorComponent.prototype, "showOrHide", void 0);
CursorComponent = __decorate([
    core_1.Component({
        selector: 'cursor',
        templateUrl: 'app/cursor.component.html',
        styleUrls: ['app/cursor.component.css']
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], CursorComponent);
exports.CursorComponent = CursorComponent;
//# sourceMappingURL=cursor.component.js.map