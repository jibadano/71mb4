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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var common_1 = require('@angular/common');
var app_component_1 = require('./app.component');
var dashboard_component_1 = require('./dashboard.component');
var home_component_1 = require('./home.component');
var user_session_component_1 = require('./user-session.component');
var menu_component_1 = require('./menu.component');
var admin_component_1 = require('./admin.component');
var board_component_1 = require('./board.component');
var chat_component_1 = require('./chat.component');
var app_service_1 = require('./app.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule
            ],
            declarations: [
                app_component_1.AppComponent,
                board_component_1.BoardComponent,
                dashboard_component_1.DashboardComponent,
                home_component_1.HomeComponent,
                user_session_component_1.UserSessionComponent,
                menu_component_1.MenuComponent,
                admin_component_1.AdminComponent,
                chat_component_1.ChatComponent
            ],
            providers: [
                app_service_1.AppService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map