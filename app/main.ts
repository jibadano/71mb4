import { platformBrowserDynamic, bootstrap } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {enableProdMode} from '@angular/core';
import {provide, PLATFORM_DIRECTIVES} from '@angular/core';
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
