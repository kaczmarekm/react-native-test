enum LogLevel {
  Error = 'error',
  Warn = 'warn',
  Verbose = 'log',
  Info = 'info',
  Debug = 'debug',
}

const logEvent = (level: LogLevel, message: string, obj?: object | string) => {
  if (__DEV__) {
    console[level](message, obj);
  }
};

export const Logger = {
  log(message: string, obj?: object | string) {
    logEvent(LogLevel.Verbose, message, obj);
  },
  error(error: string, obj?: object | string) {
    logEvent(LogLevel.Error, error, obj);
  },
  warn(message: string, obj?: object | string) {
    logEvent(LogLevel.Warn, message, obj);
  },
  info(message: string, obj?: object | string) {
    logEvent(LogLevel.Info, message, obj);
  },
  debug(message: string, obj?: object | string) {
    logEvent(LogLevel.Debug, message, obj);
  },
};
