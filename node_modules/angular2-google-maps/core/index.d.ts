/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.13.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
import { ModuleWithProviders } from '@angular/core';
export * from './directives';
export * from './services';
export * from './map-types';
export { LatLngBounds, LatLng, LatLngLiteral, MapTypeStyle } from './services/google-maps-types';
/** @deprecated */
export declare const GOOGLE_MAPS_PROVIDERS: any[];
/**
 * The angular2-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 *
 * @experimental
 */
export declare class AgmCoreModule {
    static forRoot(): ModuleWithProviders;
}
