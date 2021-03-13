import { ConfigService } from './config.service';

export const ConfigServiceFactory = () => {
  // Create env
  const config = new ConfigService();

  // Read environment variables from browser window
  const browserWindow = window || {};
  const browserWindowEnv = browserWindow['__config'] || {};

  // Assign environment variables from browser window to env
  // In the current implementation, properties from env.js overwrite defaults from the EnvService.
  // If needed, a deep merge can be performed here to merge properties instead of overwriting them.
  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
      config[key] = window['__config'][key];
    }
  }

  return config;
};

export const ConfigServiceProvider = {
  provide: ConfigService,
  useFactory: ConfigServiceFactory,
  deps: [],
};
