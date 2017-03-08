/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.13.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, provide } from '@angular/core';
import { GOOGLE_MAPS_DIRECTIVES } from './directives-const';
import { LazyMapsAPILoader } from './services/maps-api-loader/lazy-maps-api-loader';
import { MapsAPILoader } from './services/maps-api-loader/maps-api-loader';
import { BROWSER_GLOBALS_PROVIDERS } from './utils/browser-globals';
// main modules
export * from './directives';
export * from './services';
export * from './map-types';
// Google Maps types
/** @deprecated */
export const GOOGLE_MAPS_PROVIDERS = [
    BROWSER_GLOBALS_PROVIDERS,
    provide(MapsAPILoader, { useClass: LazyMapsAPILoader }),
];
/**
 * The angular2-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 *
 * @experimental
 */
let AgmCoreModule_1;
export let AgmCoreModule = AgmCoreModule_1 = class AgmCoreModule {
    static forRoot() {
        return {
            ngModule: AgmCoreModule_1,
            providers: GOOGLE_MAPS_PROVIDERS,
        };
    }
};
AgmCoreModule = AgmCoreModule_1 = __decorate([
    NgModule({ declarations: GOOGLE_MAPS_DIRECTIVES, exports: GOOGLE_MAPS_DIRECTIVES }), 
    __metadata('design:paramtypes', [])
], AgmCoreModule);

//# sourceMappingURL=index.js.map
