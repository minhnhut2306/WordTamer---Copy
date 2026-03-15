let tron: any = console;

if (__DEV__) {
  tron = require('../config/ReactotronConfig').default;
}

const logger = {
  log: (...args: any[]) => tron.log?.(...args),
  warn: (...args: any[]) => tron.warn?.(...args),
  error: (...args: any[]) => tron.error?.(...args),
};

export default logger;
