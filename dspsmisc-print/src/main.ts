import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// https://stackoverflow.com/questions/50965794/angular-6-cant-resolve-all-parameters-for-appcomponent
// import 'core-js/es6/reflect';
// import 'core-js/es7/reflect';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
