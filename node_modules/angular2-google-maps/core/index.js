/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.13.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
var directives_const_1 = require('./directives-const');
var lazy_maps_api_loader_1 = require('./services/maps-api-loader/lazy-maps-api-loader');
var maps_api_loader_1 = require('./services/maps-api-loader/maps-api-loader');
var browser_globals_1 = require('./utils/browser-globals');
// main modules
__export(require('./directives'));
__export(require('./services'));
// Google Maps types
/** @deprecated */
exports.GOOGLE_MAPS_PROVIDERS = [
    browser_globals_1.BROWSER_GLOBALS_PROVIDERS,
    core_1.provide(maps_api_loader_1.MapsAPILoader, { useClass: lazy_maps_api_loader_1.LazyMapsAPILoader }),
];
/**
 * The angular2-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 *
 * @experimental
 */
var AgmCoreModule = (function () {
    function AgmCoreModule() {
    }
    AgmCoreModule.forRoot = function () {
        return {
            ngModule: AgmCoreModule,
            providers: exports.GOOGLE_MAPS_PROVIDERS,
        };
    };
    AgmCoreModule = __decorate([
        core_1.NgModule({ declarations: directives_const_1.GOOGLE_MAPS_DIRECTIVES, exports: directives_const_1.GOOGLE_MAPS_DIRECTIVES }), 
        __metadata('design:paramtypes', [])
    ], AgmCoreModule);
    return AgmCoreModule;
}());
exports.AgmCoreModule = AgmCoreModule;

//# sourceMappingURL=index.js.map
