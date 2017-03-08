"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var app_component_1 = require("./app.component");
var cursor_component_1 = require("./cursor.component");
var home_component_1 = require("./home.component");
var user_session_component_1 = require("./user-session.component");
var info_component_1 = require("./info.component");
var admin_component_1 = require("./admin.component");
var bet_component_1 = require("./bet.component");
var chat_component_1 = require("./chat.component");
var players_component_1 = require("./players.component");
var roulette_component_1 = require("./roulette.component");
var app_service_1 = require("./app.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
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
            bet_component_1.BetComponent,
            cursor_component_1.CursorComponent,
            home_component_1.HomeComponent,
            user_session_component_1.UserSessionComponent,
            info_component_1.InfoComponent,
            admin_component_1.AdminComponent,
            chat_component_1.ChatComponent,
            players_component_1.PlayersComponent,
            roulette_component_1.RouletteComponent
        ],
        providers: [
            app_service_1.AppService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map