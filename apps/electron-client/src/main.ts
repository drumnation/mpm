import SquirrelEvents from 'apps/electron-client/src/app/events/squirrel.events.js';
import ElectronEvents from 'apps/electron-client/src/app/events/electron.events.js';
import UpdateEvents from 'apps/electron-client/src/app/events/update.events.js';

import { app, BrowserWindow } from 'electron';
import App from './app/app.js';

export default class Main {
  static initialize() {
    if (SquirrelEvents.handleEvents()) {
      // squirrel event handled (except first run event) and app will exit in 1000ms, so don't do anything else
      app.quit();
    }
  }

  static bootstrapApp() {
    App.main(app, BrowserWindow);
  }

  static bootstrapAppEvents() {
    ElectronEvents.bootstrapElectronEvents();

    // initialize auto updater service
    if (!App.isDevelopmentMode()) {
      // UpdateEvents.initAutoUpdateService();
    }
  }
}

// handle setup events as quickly as possible
Main.initialize();

// bootstrap app
Main.bootstrapApp();
Main.bootstrapAppEvents();
